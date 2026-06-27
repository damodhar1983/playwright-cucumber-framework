import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { ShopPage } from "../../pages/ShopPage";
import { CartPage } from "../../pages/CartPage";

Given("I navigate to the Shop page",{ timeout: 100 * 1000 },
  async function (this: CustomWorld) {
    this.shopPage = new ShopPage(this.page);
    this.cartPage = new CartPage(this.page);

    await this.shopPage.navigateToShop();
  }
);

When("I add {int} {string} to the cart",{ timeout: 100 * 1000 },
  async function (this: CustomWorld, quantity: number, product: string) {
    await this.shopPage.addProduct(product, quantity);
  }
);

When("I navigate to the Cart page",{ timeout: 100 * 1000 },
  async function (this: CustomWorld) {
    await this.shopPage.goToCart();
  }
);

Then("the subtotal should equal unit price multiplied by quantity for each product",{ timeout: 100 * 1000 },
  async function (this: CustomWorld) {
    const items = await this.cartPage.getCartItems();

    for (const item of items) {
      expect(item.subtotal).toBeCloseTo(item.price * item.quantity, 2);
    }
  }
);

Then("the cart total should equal the sum of all subtotals",{ timeout: 100 * 1000 },
  async function (this: CustomWorld) {
    const items = await this.cartPage.getCartItems();
    const expectedTotal = items.reduce((sum, item) => sum + item.subtotal, 0);

    const actualTotal = await this.cartPage.getTotal();
    expect(actualTotal).toBeCloseTo(expectedTotal, 2);
  }
);
