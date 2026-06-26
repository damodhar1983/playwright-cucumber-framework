import { Page } from "@playwright/test";

export interface CartItem {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export class CartPage {

    constructor(private page: Page) { }

    // Returns all products from the cart
    async getCartItems(): Promise<CartItem[]> {

        const rows = this.page.locator("table tbody tr");
        const rowCount = await rows.count();

        const items: CartItem[] = [];

        for (let i = 0; i < rowCount; i++) {

            const row = rows.nth(i);

            const name = (await row.locator("td").nth(0).textContent())?.trim() || "";

            const priceText = (await row.locator("td").nth(1).textContent())?.trim() || "";
            const subtotalText = (await row.locator("td").nth(3).textContent())?.trim() || "";

            const quantityText = await row
                .locator("td")
                .nth(2)
                .locator("input")
                .inputValue();

            items.push({
                name,
                price: this.convertToNumber(priceText),
                quantity: Number(quantityText),
                subtotal: this.convertToNumber(subtotalText)
            });
        }

        return items;
    }

    // Returns the cart total
    async getTotal(): Promise<number> {

        const totalText = await this.page
            .locator("strong.total")
            .textContent();

        return this.convertToNumber(totalText ?? "");
    }

    private convertToNumber(value: string): number {

        return Number(
            value
                .replace("Total:", "")
                .replace("$", "")
                .trim()
        );
    }
}