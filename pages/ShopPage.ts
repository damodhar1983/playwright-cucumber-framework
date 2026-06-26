import { expect, Locator, Page } from "@playwright/test";

export class ShopPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to Shop page
    async navigateToShop() {
        await this.page.goto("http://jupiter.cloud.planittesting.com");
        // await this.page.getByRole("link", { name: "Shop" }).click();
        await this.page.locator('#nav-shop a').click();
        await this.page.waitForTimeout(5000);

    }

    // Add a product multiple times
    async addProduct(productName: string, quantity: number) {

        const productCard = this.page.locator(".product")
            .filter({ hasText: productName });

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