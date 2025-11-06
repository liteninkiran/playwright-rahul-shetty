import { expect, test } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/angularpractice/';

test.only('Playwright Special Locators...', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByLabel('Check me out if you Love IceCreams!').click(); // or .check()
    await page.getByLabel('Employed').click(); // or .check()
    await page.getByLabel('Gender').selectOption('Female');
    await page.pause();
});
