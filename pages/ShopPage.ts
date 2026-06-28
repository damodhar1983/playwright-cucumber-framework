import { expect, Locator, Page } from "@playwright/test";

export class ShopPage {

    readonly page: Page;
    // store product prices here
    productPrices: Map<string, number> = new Map();

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to Shop page
    async navigateToShop() {
        await this.page.locator('#nav-shop a').click();
        await this.page.waitForTimeout(5000);

    }

    // Add a product multiple times
    async addProduct(productName: string, quantity: number) {

        const productCard = this.page.locator(".product").filter({ hasText: productName });

        //  extract price text
        const priceLocator = productCard.locator(".product-price");
        const priceText = await priceLocator.textContent();
        if (!priceText) {
            throw new Error(`Price not found for ${productName}`);
        }

        // remove any non-numeric except dot, keep decimals, then convert to number
        const cleanPrice = priceText.replace(/[^0-9.]/g, "").trim();
        const priceNumber = parseFloat(cleanPrice);
        if (Number.isNaN(priceNumber)) {
            throw new Error(`Unable to parse price '${priceText}' for ${productName}`);
        }

        this.productPrices.set(productName, priceNumber);
        //click on Buy
        const buyButton = productCard.getByRole("link", { name: "Buy" });

        for (let i = 0; i < quantity; i++) {
            await buyButton.click();
        }
        await this.page.waitForTimeout(1000);
    }

    // Navigate to Cart page
    async goToCart() {
        await this.page.getByRole("link", { name: /Cart/i }).click();
        await this.page.waitForTimeout(5000);
    }

}