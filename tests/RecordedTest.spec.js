import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.getByRole('textbox', { name: 'Username:' }).click();
    await page
        .getByRole('textbox', { name: 'Username:' })
        .fill('rahulshettyacademy');
    await page.getByRole('textbox', { name: 'Username:' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password:' }).fill('learning');
    await page.getByRole('button', { name: 'Sign In' }).click();
});
