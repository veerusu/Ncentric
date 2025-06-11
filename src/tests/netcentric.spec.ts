import { test } from '../hooks/fixture';
import { expect } from '@playwright/test';
import JobsPage from '../pages/jobsPage';
import HeaderPage from '../pages/headerPage';
import { mobileTest } from '../hooks/mobileTest';


test.describe('Netcentric Website Tests', () => {

    test('Check cookies persist state', async ({ page }) => {
        await page.goto('/');
        expect(await page.context().storageState()).toBeTruthy();
    });

    test('Search for "adobe" on header search bar', async ({ page }) => {
        const header = new HeaderPage(page);
        await page.goto('/');
        await header.search('adobe');
        await header.assertTopResultsContain('adobe');
    });

    test('Search for "QA" in careers iframe', async ({ page }) => {
        const jobs = new JobsPage(page);
        await jobs.goto();
        await jobs.searchFor('QA');
        await jobs.expectResultToContain('QA');
    });
  
    test('Job results load and change with pagination', async ({ page }) => {
        const jobs = new JobsPage(page);
        await jobs.goto();
        await jobs.assertJobsAreVisible();

        const page1Jobs = await jobs.getJobTitles();
        console.log('Page 1 Jobs:', page1Jobs);

        await jobs.goToPage(2);
        const page2Jobs = await jobs.getJobTitles();    
        console.log('Page 2 Jobs:', page2Jobs);
    
        expect(page1Jobs.length).toBeGreaterThan(0);        
        expect(page2Jobs).not.toEqual(page1Jobs);
    });

    test('Navigate to "Our Expertise" on desktop', async ({ page }) => {
        const header = new HeaderPage(page);
        await page.goto('/');
        await header.navigateToExpertise();
    });

    mobileTest('Navigate to "Our Expertise" on mobile', async ({ page }) => {
        await page.goto('/');
        const header = new HeaderPage(page);
        await header.navigateToExpertise();
    });
});
