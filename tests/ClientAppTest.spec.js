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
    const url = `${BASE_URL}/client/auth/login/`;
    const cards = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const countryInput = page.locator("[placeholder*='Country']");
    const countries = page.locator('.ta-results');
    await page.goto(url);

    // Act
    // Login
    await page.locator('#userEmail').fill('test551254@gmail.com');
    await page.locator('#userPassword').fill('Rahulshetty1!');
    await page.locator('#login').click();

    // Add items to cart
    await cards.first().waitFor();
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const product = products.nth(i).locator('b');
        if (await product.textContent() === productName) {
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }

    // Goto cart
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();

    // Assert
    const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();

    // Goto checkout
    await page.locator('text=Checkout').click();

    // Enter country
    await countryInput.pressSequentially('ind');
    await countries.waitFor();
    const countryCount = await countries.locator('button').count();

    for (let i = 0; i < countryCount; i++) {
        const btn = countries.locator('button').nth(i);
        const text = await btn.textContent();
        if (text.trim() === 'India') {
            await btn.click();
            break;
        }
    }
    await page.pause();

});
