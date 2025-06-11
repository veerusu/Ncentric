import { chromium } from '@playwright/test';


export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.netcentric.biz');

  const acceptCookiesButton = page.getByRole('button', { name: 'Accept All Cookies' });
  if (await acceptCookiesButton.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptCookiesButton.click();
  }

  await context.storageState({ path: '../helper/auth/session.json' });
  await browser.close();
}