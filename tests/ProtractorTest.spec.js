import { expect, test } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/angularpractice/';

test.only('Playwright Special Locators...', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByLabel('Check me out if you Love IceCreams!').click(); // or .check()
    await page.getByLabel('Employed').click(); // or .check()
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Password').fill('abc123');
    await page.getByRole('button', { name: 'Submit' }).click();
    const searchText = 'Success! The Form has been submitted successfully!.';
    await page.getByText(searchText).isVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    const filter = { hasText: 'Nokia Edge' };
    await page.locator('app-card').filter(filter).getByRole('button').click();

    await page.pause();
});
