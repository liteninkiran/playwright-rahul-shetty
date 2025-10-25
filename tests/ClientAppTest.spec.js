import { expect, test } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com';

const loginHappy =
    'Test another homepage loads when correct credentials are entered';

const loginHappyFn = async ({ page }) => {
    // Arrange
    const cards = page.locator('.card-body b');
    const url = `${BASE_URL}/client/auth/login/`;
    await page.goto(url);

    // Act
    await page.locator('#userEmail').fill('test551254@gmail.com');
    await page.locator('#userPassword').fill('Rahulshetty1!');
    await page.locator('#login').click();

    // Assert
    await expect(cards).not.toHaveCount(0);
};

test.only(loginHappy, loginHappyFn);
