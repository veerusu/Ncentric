import { expect, FrameLocator, Locator, Page } from "@playwright/test"

export default class JobsPage {
    readonly page: Page
    readonly iframeLocator: FrameLocator;
    readonly jobCards: Locator;
    readonly paginationLink: (page: number) => Locator;
    readonly jobSearchInput: Locator;

    constructor(page: Page) {
        this.page = page
        this.iframeLocator = page.frameLocator('iframe.embed-job-openings');
        this.jobSearchInput = this.iframeLocator.locator('#id_position_name__icontains');
        this.jobCards = this.iframeLocator.locator('div.row.job-element-in-list');
        this.paginationLink = (page: number) =>
            this.iframeLocator.locator(`.pagination a:not(.active):text-is("${page}")`);
    }

    async goto() {
    await this.page.goto('https://www.netcentric.biz/jobs');
    await this.iframeLocator.locator('body').waitFor({ state: 'visible' });
    }

    async searchFor(term: string) {
        await this.jobSearchInput.fill(term);
        await this.jobSearchInput.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getJobTitles(): Promise<string[]> {
        const titleElements = this.iframeLocator.locator('h3 > a');
        await titleElements.first().waitFor({ state: 'visible' });
        const titles = await titleElements.allTextContents();
        return titles.map(title => title.trim());
    }
    


    async goToPage(pageNumber: number) {
    const link = this.paginationLink(pageNumber);
    await link.click();
    await expect(
        this.iframeLocator.locator(`div.pagination a.active:text-is("${pageNumber}")`)
    ).toBeVisible();
    }

    async assertJobsAreVisible() {
    const count = await this.jobCards.count();
    expect(count).toBeGreaterThan(0);
    }

    async expectResultToContain(text: string) {
    const result = this.jobCards.locator(`text=${text}`);
    await result.first().waitFor({ state: 'visible' });
    console.log(`The first result containing "${text}" is:`, await result.first().textContent());
    }
}