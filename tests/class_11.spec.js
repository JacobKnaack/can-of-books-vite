import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// TODO class 15:  comment out the line below
// import { test, expect } from '@playwright/test';

// TODO class 15: Un-comment the line below
import { authTest as test, expect } from './fixtures/auth.js';

const REACT_APP_URL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:5173';

test.describe('As a user, I\'d like to see the list of books, so that I can see what\'s recommended to me.', () => {

  test('When the server does return some books, use a Bootstrap carousel to render all the books returned.', async ({ page }) => {
    await page.goto(REACT_APP_URL);
    await page.waitForLoadState('networkidle');

    let bookCount = await page.locator(`.carousel-item`).count();

    expect(bookCount > 1).toBeTruthy();
  });

  test('Use React Router to add ability for user to navigate between Home and About "pages"', async ({ page }) => {
    await page.goto(REACT_APP_URL);

    let regex = /about/i;
    const anchor = await page.getByRole('link', { name: regex });

    await expect(anchor).toBeVisible();
  });

  test('Update the About page at path /about so that it displays the project developer\'s information, including a link to GitHub.', async ({ page }) => {
    await page.goto(REACT_APP_URL + '/about');

    let regex = /Github/ig;
    let content = await page.getByText(regex);

    await expect(content).toBeVisible();
  });
});