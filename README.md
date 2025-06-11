# Ncentric Playwright Test Automation

This project implements automated testing for [Netcentric](https://www.netcentric.biz) using [Playwright](https://playwright.dev/) with TypeScript.

## Features

- Automated browser tests for Chromium (with optional support for Firefox, WebKit, and mobile devices)
- Session state management
- Screenshot capture for each test
- Allure reporting
- CI integration via GitHub Actions

## Project Structure

- `src/tests/` – Test files
- `src/pages/` – Page Object Model classes
- `src/hooks/` – Custom fixtures and setup scripts
- `playwright.config.ts` – Playwright configuration
- `.github/workflows/playwright.yml` – CI workflow

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npx playwright test
   ```

3. **Generate and view Allure report:**
   ```bash
   npm run test:allure
   ```

## Implementation Notes

- Uses Playwright’s Page Object Model for maintainable test code.
- Session state is saved and reused for faster, authenticated tests.
- Screenshots are automatically captured for debugging.
- CI workflow runs tests on every push and pull request.

---
