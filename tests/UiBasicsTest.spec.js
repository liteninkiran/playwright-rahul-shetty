import { expect, test } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com';
const LOGIN_URL = `${BASE_URL}/loginpagePractise`;

const testLoginUnhappy =
    'Test incorrect username/password message appears when incorrect credentials are entered';

const testLoginHappy =
    'Test homepage loads when correct credentials are entered';

const testUiControls = 'UI Controls';

const testLoginUnhappyFn = async ({ browser }) => {
    // Arrange
    const context = await browser.newContext();
    const page = await context.newPage();
    const locator = page.locator("[style*='block']");

    // Act
    await page.goto(LOGIN_URL);
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('xxxx');
    await page.locator('#signInBtn').click();

    // Assert
    await expect(locator).toContainText('Incorrect');
    await expect(locator).toHaveText('Incorrect username/password.');
};

const testLoginHappyFn = async ({ browser }) => {
    // Arrange
    const context = await browser.newContext();
    const page = await context.newPage();
    const cards = page.locator('.card-body a');

    // Act
    await page.goto(LOGIN_URL);
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();

    // Assert
    await cards.first().waitFor();
    const cardContents = await cards.allTextContents();
    console.log(cardContents);
};

const testUiControlsFn = async ({ page }) => {
    // Arrange
    await page.goto(LOGIN_URL);

    // Act
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('select.form-control').selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();

    // Assert
};

test(testLoginUnhappy, testLoginUnhappyFn);
test(testLoginHappy, testLoginHappyFn);
test.only(testUiControls, testUiControlsFn);
