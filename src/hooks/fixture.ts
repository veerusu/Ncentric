import { test as base, chromium, Browser, Page } from '@playwright/test';

let browser: Browser;
let page: Page;

export const test = base.extend<{ page: Page }>({
  page: async ({}, use) => {
    if (!browser) {
      browser = await chromium.launch();
    }
    if (!page) {
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto('https://www.netcentric.biz');
      // Accept cookies if needed
      const btn = page.getByRole('button', { name: /Accept/i });
      if (await btn.isVisible().catch(() => false)) await btn.click();
    }
    await use(page);
  },
});

test.afterAll(async () => {
  if (browser) await browser.close();
});