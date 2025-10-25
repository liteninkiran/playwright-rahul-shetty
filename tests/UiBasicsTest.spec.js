import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com';
const LOGIN_URL = `${BASE_URL}/loginpagePractise`;

const testLoginUnhappy =
    'Test incorrect username/password message appears when incorrect credentials are entered';
const testLoginUnhappyFn = async ({ browser }) => {
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
};

const testLoginHappy =
    'Test homepage loads when correct credentials are entered';
const testLoginHappyFn = async ({ browser }) => {
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
};

const testAdminType = 'Test "admin" is selected when user cancels';
const testAdminTypeFn = async ({ page }) => {
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
    expect(adminOption).toBeChecked();
};

const testUserType = 'Test "user" is selected when user confirms';
const testUserTypeFn = async ({ page }) => {
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
    expect(radioBtn).toBeChecked();
};

const testAgreeCheckbox = 'Test the "I Agree" checkbox is selected';
const testAgreeCheckboxFn = async ({ page }) => {
    // Arrange
    const checkbox = page.locator('#terms');
    await page.goto(LOGIN_URL);

    // Act | Assert
    await checkbox.click();
    expect(checkbox).toBeChecked();

    // Act | Assert
    await checkbox.uncheck();
    expect(checkbox).not.toBeChecked();
};

test(testLoginUnhappy, testLoginUnhappyFn);
test(testLoginHappy, testLoginHappyFn);
test(testAdminType, testAdminTypeFn);
test(testUserType, testUserTypeFn);
test.only(testAgreeCheckbox, testAgreeCheckboxFn);
