import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { authTest as test, expect } from './fixtures/auth.js';

const REACT_APP_URL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:5173';

test.describe('Create: As a user, I\'d like to add a new book to the shelf, so that I can update the list with my own recommendations.', () => {

  test('Create a BookFormModal component that contains the form elements required to collect the user input needed for creating a new book. Reveal this modal when the "Add Book" button is clicked, and hide the modal when the modal is closed.', async ({ page }) => {
    await page.goto(REACT_APP_URL);
    await page.waitForLoadState('networkidle');
    await page.locator(`.btn-primary`).click();

    let modalForm = await page.locator('.modal-dialog');

    await expect(modalForm).toBeVisible();
  });

  test('When the form is submitted, use Axios to send a POST request to the server\'s /books endpoint, including the data from the form.  The server should respond with the new book that was successfully saved, which you should pass up to the BestBooks component, save to state, to allow React to re-render the list of all books.', async ({ page }) => {
    const tag = Math.floor(Math.random() * 1000);
    const title = `Test Title - ${tag}`;
    const description = `Test Description - ${tag}`;

    await page.goto(REACT_APP_URL);
    await page.waitForLoadState('networkidle');

    await page.locator(`.btn-primary`).click();
    await page.locator(`input[id='title']`).fill(title);
    await page.locator(`input[id='description']`).fill(description);
    await page.locator(`button[type='submit']`).click();

    await expect(page.locator(`text=${title}`)).toHaveCount(1);
    await expect(page.locator(`text=${description}`)).toHaveCount(1);
  });

});

test.describe('Delete: As a user, I want to remove books from my list, so that only the most important books are on my shelf.', () => {

  test('In your front-end Book component, add a "Delete" button component for every book in the list.', async ({ page }) => {
    await page.goto(REACT_APP_URL);
    await page.waitForLoadState('networkidle');

    //  should see a list of books.
    let carouselList = await page.locator(`.carousel-item`).all();
    expect(carouselList.length).toBeTruthy();

    // should see a button to delete a given book.
    let btnEls = await page.locator(`.btn-danger`).all();
    expect(btnEls.length).toBeTruthy();
  });

  test('When the user clicks the delete button, the book should be removed.', async ({ page }) => {
    page.on('dialog', async dialog => {
      await dialog.accept();
    }); // accept prompt pop-up.
    await page.goto(REACT_APP_URL);
    await page.waitForLoadState('networkidle');

    let initialCount = await page.locator(`.carousel-item`).count();

    await page.locator(`.btn-danger`).first().click();

    await page.waitForTimeout(2000);
    let deletedCount = await page.locator(`.carousel-item`).count();
    expect(deletedCount).toEqual(initialCount - 1);
  });

});