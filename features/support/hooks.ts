import { Before, After, Status } from "@cucumber/cucumber";
import {chromium,firefox,webkit,BrowserType} from "@playwright/test";
import { CustomWorld } from "./world";
import fs from "fs";
import { config } from "dotenv";

config();

type BrowserName = "chromium" | "firefox" | "webkit";

const browsers: Record<BrowserName, BrowserType> = { chromium, firefox, webkit };

Before(async function (this: CustomWorld) {
  const browserName: BrowserName =
    (process.env.BROWSER as BrowserName) || "chromium";

  const launcher = browsers[browserName];

  const browser = await launcher.launch({
    headless: false,
  });

  this.browser = browser;
  this.context = await browser.newContext();

  // Start tracing
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  const fileName = scenario.pickle.name.replace(/[^a-z0-9]/gi, "_");

  await this.context?.tracing.stop({
    path: `reports/traces/${fileName}.zip`,
  });

  await this.context?.close();
  await this.browser?.close();
});