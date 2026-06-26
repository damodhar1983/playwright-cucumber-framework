import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { ShopPage } from "../../pages/ShopPage";
import { CartPage } from "../../pages/CartPage";

let shopPage: ShopPage;
let cartPage: CartPage;

Given("I navigate to the Shop page", { timeout: 100 * 1000 },
    async function (this: CustomWorld) {

        shopPage = new ShopPage(this.page);
        cartPage = new CartPage(this.page);

        await shopPage.navigateToShop();
    }
);

When("I add {int} {string} to the cart", { timeout: 100 * 1000 },
    async function (
        this: CustomWorld,
        quantity: number,
        product: string
    ) {

        await shopPage.addProduct(product, quantity);

    }
);

When("I navigate to the Cart page", { timeout: 100 * 1000 },
    async function () {
        await shopPage.goToCart();
    }
);

Then("the subtotal should equal unit price multiplied by quantity for each product", { timeout: 100 * 1000 },
    async function () {
        const items = await cartPage.getCartItems();
        for (const item of items) {
            expect(item.subtotal).toBeCloseTo(
                item.price * item.quantity, 2
            );
        }
    }
);

Then("the cart total should equal the sum of all subtotals", { timeout: 100 * 1000 },
    async function () {
        const items = await cartPage.getCartItems();
        const expectedTotal = items.reduce(
            (sum, item) => sum + item.subtotal, 0
        );
        const actualTotal = await cartPage.getTotal();
        expect(actualTotal).toBeCloseTo(expectedTotal, 2);
    }
);