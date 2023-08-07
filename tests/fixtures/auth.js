import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
dotenv.config({ path: '.env.local' });

export { expect } from '@playwright/test';

const REACT_APP_URL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:5173';
const TEST_EMAIL = process.env.PLAYWRIGHT_TEST_EMAIL;
const TEST_PASSWORD = process.env.PLAYWRIGHT_TEST_PASSWORD;

export const auth = test.extend({
  login: async ({page}, use) => {
    await page.goto(REACT_APP_URL);
    await page.getByRole('button', { name: /log in/i }).click();

    // fill out user credentials -> store as secrets somewhere
    await page.getByPlaceholder(/yours@example.com/i).fill(TEST_EMAIL);
    await page.getByPlaceholder(/your password/i).fill(TEST_PASSWORD);
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText(/log out/i)).toBeVisible();
    await use(page);
  }
});
