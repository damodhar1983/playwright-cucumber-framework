import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { ContactPage } from "../../pages/ContactPage";
import { ShopPage } from "../../pages/ShopPage";
import { CartPage } from "../../pages/CartPage";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  contactPage!: ContactPage;
  shopPage!: ShopPage;
  cartPage!: CartPage;
}

setWorldConstructor(CustomWorld);