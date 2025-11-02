import { test, expect } from '@playwright/test';
import { assert } from 'console';

const BASE_URL = 'https://rahulshettyacademy.com';
const LOGIN_URL = `${BASE_URL}/loginpagePractise`;

test('Test incorrect username/password message appears when incorrect credentials are entered', async ({
    browser,
}) => {
    // Arrange
    const context = await browser.newContext();
    const page = await context.newPage();
    const locator = page.locator("[style*='block']");
    await page.goto(LOGIN_URL);
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('xxxx');

    // Act
    await page.locator('#signInBtn').click();

    // Assert
    await expect(locator).toContainText('Incorrect');
    await expect(locator).toHaveText('Incorrect username/password.');
});

test('Test homepage loads when correct credentials are entered', async ({
    browser,
}) => {
    // Arrange
    const context = await browser.newContext();
    const page = await context.newPage();
    const cards = page.locator('.card-body a');
    await page.goto(LOGIN_URL);
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');

    // Act
    await page.locator('#signInBtn').click();

    // Assert
    await cards.first().waitFor();
    const cardContents = await cards.allTextContents();
    console.log(cardContents);
});

test('Test "admin" is selected when user cancels', async ({ page }) => {
    // Arrange
    const adminOption = page.locator('.radiotextsty').first();
    const userOption = page.locator('.radiotextsty').last();
    await page.goto(LOGIN_URL);
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('select.form-control').selectOption('consult');

    // Act
    await userOption.click();
    await page.locator('#cancelBtn').click();
    await adminOption.waitFor();
    await userOption.waitFor();

    // Assert
    await expect(adminOption).toBeChecked();
});

test('Test "user" is selected when user confirms', async ({ page }) => {
    // Arrange
    const radioBtn = page.locator('.radiotextsty').last();
    await page.goto(LOGIN_URL);
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('select.form-control').selectOption('consult');

    // Act
    await radioBtn.click();
    await page.locator('#okayBtn').click();
    await radioBtn.waitFor();

    // Assert
    await expect(radioBtn).toBeChecked();
});

test('Test the "I Agree" checkbox is selected', async ({ page }) => {
    // Arrange
    const checkbox = page.locator('#terms');
    await page.goto(LOGIN_URL);

    // Act | Assert
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    // Act | Assert
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
});

test('Test the link has the "blinking" class', async ({ page }) => {
    // Arrange
    const docLink = page.locator("[href*='documents-request']");
    await page.goto(LOGIN_URL);

    // Assert
    await expect(docLink).toHaveAttribute('class', 'blinkingText');
});

test.only('Handling child windows', async ({ browser }) => {
    // Arrange
    const context = await browser.newContext();
    const page = await context.newPage();
    const docLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    await page.goto(LOGIN_URL);

    // Act
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        docLink.click(),
    ]);

    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const emailDomain = arrayText[1].split(' ')[0];
    await userName.fill(emailDomain);
    const userText = await userName.textContent();
});
