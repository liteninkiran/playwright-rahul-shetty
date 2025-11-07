import { expect, test } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/angularpractice/';

test.only('Playwright Special Locators...', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByLabel('Check me out if you Love IceCreams!').click(); // or .check()
    await page.getByLabel('Employed').click(); // or .check()
    await page.getByLabel('Gender').selectOption('Female');

    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button', { name: 'Submit' }).click();
    const isVisible = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.pause();
    await page.locator('app-card').filter({
        hasText: 'Nokia Edge',
    }).getByRole('button').click();
});
