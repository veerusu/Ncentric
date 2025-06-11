import { test as base, chromium, devices } from '@playwright/test';

export const mobileTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...devices['iPhone 13'],
      storageState: 'src/helper/auth/session.json',
    });
    await use(context);
    await context.close();
  },
});