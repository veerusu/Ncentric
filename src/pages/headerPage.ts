import { expect, Locator, Page } from "@playwright/test";

export default class HeaderPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResults: Locator;
    readonly burgerMenu: Locator;
    readonly expertiseLink: Locator; 
    readonly whatWeDoLink: Locator; 
    readonly submenuArrow: Locator;

    constructor(page: Page) {
        this.page = page
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchResults = page.locator('(//a[@class="results-link"])');
        this.burgerMenu = page.locator('div.nav-hamburger');
        this.whatWeDoLink = page.locator('(//li[@class="nav-drop"])[1]');
        this.expertiseLink = page.locator('(//div[@class="nav-drop-ul-wrapper"]//a)[2]');
        this.submenuArrow = page.locator('(//a[text()="What we do"]/following-sibling::span)[1]');
    }
    async navigateToExpertise() {
        const viewport = this.page.viewportSize();

        if (viewport && viewport.width <= 899) {
            await this.burgerMenu.click();
            await this.submenuArrow.click();
        } else {
        await this.whatWeDoLink.hover();
        }
        await this.expertiseLink.click();
        await expect(this.page).toHaveURL(/.*what-we-do/);
        console.log(`Navigated to Expertise page: ${this.page.url()}`);
    }
    async search(term: string) {
        await this.searchInput.fill(term);
        const [response] = await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('/search') && resp.status() === 200),
            this.searchInput.press('Enter')
        ]);
        console.log('The URL is: ', response.url());
        console.log('The response status is: ', response.status());
    }
    async assertTopResultsContain(term: string) {
        await this.searchResults.first().waitFor({ state: 'visible' })
        const texts = await this.searchResults.allTextContents();
        const top3 = texts.slice(0, 3);
        top3.forEach((text, i) => console.log(`Result ${i + 1}:`, text));
        for (let i = 0; i < Math.min(3, texts.length); i++) {
            expect(texts[i].toLowerCase()).toContain(term.toLowerCase());
        }
    }
}