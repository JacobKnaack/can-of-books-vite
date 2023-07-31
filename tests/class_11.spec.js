import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
const REACT_APP_URL = import.meta.env.VITE_TEST_URL || 'http://localhost:3000';

dotenv.config();

test.describe('As a user, I\'d like to see the list of books, so that I can see what\'s recommended to me.', () => {

  test('When the server does return some books, use a Bootstrap carousel to render all the books returned.', async ({ page }) => {
    await page.goto(REACT_APP_URL);

    let bookItems = await page.locator(`.carousel-item`).all();

    expect(bookItems.length > 1).toBeTruthy();
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