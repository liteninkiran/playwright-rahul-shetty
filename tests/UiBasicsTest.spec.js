import { expect, test } from '@playwright/test';

test('Test incorrect username/password message appears when incorrect credentials are entered', async ({
    browser,
}) => {
    // Arrange
    const context = await browser.newContext();
    const page = await context.newPage();
    const locator = page.locator("[style*='block']");

    // Act
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('xxxx');
    await page.locator('#signInBtn').click();

    // Assert
    await expect(locator).toContainText('Incorrect');
    await expect(locator).toHaveText('Incorrect username/password.');
});

test.only('Test homepage loads when correct credentials are entered', async ({
    browser,
}) => {
    // Arrange
    const context = await browser.newContext();
    const page = await context.newPage();
    const cards = page.locator('.card-body a');

    // Act
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();

    // Assert
    await cards.first().waitFor();
    const cardContents = await cards.allTextContents();
    console.log(cardContents);
});

test('Page playwright test', async ({ page }) => {
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});
