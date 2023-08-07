import dotenv from 'dotenv';
// import { test, expect } from '@playwright/test';
import { auth as test, expect } from './fixtures/auth.js';
dotenv.config({ path: '.env.local' });

const REACT_APP_URL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:5173';

test.describe('Authentication: As a user, I\'d like to sign in with OAuth, so that I can authenticate to the site without creating yet - another username / password combo to potentially get hacked or lost.', () => {

  test('Use the Auth0 identity service to allow users to authenticate their identity for your application.', async ({ page, login }) => {
    // go to profile page
    // await login();
    await page.goto(REACT_APP_URL + '/profile');
    
    // check for profile email and image
    let emailPattern = new RegExp(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm);
    await expect(page.getByText(emailPattern)).toBeVisible();
    await expect(page.getByRole('img')).toBeVisible();
  });
});
