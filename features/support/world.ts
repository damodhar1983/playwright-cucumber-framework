import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { ContactPage } from "../../pages/ContactPage";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  contactPage!: ContactPage;
  //shopPage!: ShopPage;
  //cartPage!: CartPage;
}

setWorldConstructor(CustomWorld);