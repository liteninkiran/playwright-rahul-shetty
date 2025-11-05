import { expect, test } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com';

test('Test another homepage loads when correct credentials are entered', async ({
    page,
}) => {
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
});

test.only('Test basket', async ({
    page,
}) => {
    // Arrange
    const productName = 'ZARA COAT 3';
    const cards = page.locator('.card-body b');
    const url = `${BASE_URL}/client/auth/login/`;
    const products = page.locator('.card-body');
    await page.goto(url);

    // Act
    await page.locator('#userEmail').fill('test551254@gmail.com');
    await page.locator('#userPassword').fill('Rahulshetty1!');
    await page.locator('#login').click();

    const count = await products.count();

    for (const i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }

    // Assert
    
});
