import dotenv from 'dotenv';
// import { test, expect } from '@playwright/test';
import { auth as test, expect } from './fixtures/auth.js';
dotenv.config({ path: '.env.local' });

const REACT_APP_URL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:5173';

test.describe('Update: As a user, I want to update book details on my list, so that I can change the book status, or update the book details as I learn more about it.', () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto(REACT_APP_URL);
    await page.waitForLoadState('networkidle');

    let formElements = await page.locator('form').count();
    expect(formElements).toEqual(0);

    await page.locator('.btn-secondary').first().click();
  });

  test('Add a form in the front end to let the user edit an existing book\'s details in a modal.', async ({ page }) => {
    let formElements = await page.locator('form').count();
    expect(formElements).toEqual(1);
  });

  test('When the form is submitted, the page should display the updated book.', async ({ page }) => {
    page.on('dialog', async dialog => {
      await dialog.accept();
    }); // accept prompt pop-up.
    const tag = Math.floor(Math.random() * 1000);
    let title = `Update Test: New Title - ${tag}`;
    let description = `Update Test: New Description - ${tag}`;

    let initialCount = await page.locator(`.carousel-item`).count();

    await page.locator(`input[id='title']`).fill(title);
    await page.locator(`input[id='description']`).fill(description);
    await page.locator(`button[type='submit']`).click();

    await page.waitForTimeout(2000);
    let updatedCount = await page.locator(`.carousel-item`).count();

    await expect(page.getByText(title)).toBeVisible();
    await expect(page.getByText(description)).toBeVisible();
    expect(initialCount).toEqual(updatedCount);
  });
});