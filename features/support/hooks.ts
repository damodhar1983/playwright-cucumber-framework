import { Before, After, Status } from "@cucumber/cucumber";
import {chromium,firefox,webkit,BrowserType} from "@playwright/test";
import { CustomWorld } from "./world";
import { config } from "dotenv";

config();

type BrowserName = "chromium" | "firefox" | "webkit";

const browsers: Record<BrowserName, BrowserType> = { chromium, firefox, webkit };

Before({ timeout: 100 * 1000 },async function (this: CustomWorld) {
  const browserName: BrowserName =
    (process.env.BROWSER as BrowserName) || "chromium";

  const launcher = browsers[browserName];

  // Detect CI environment
  const isCI = process.env.CI === "true";

  const browser = await launcher.launch({
    headless: isCI,   // headed locally, headless in GitHub Actions
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
  // Navigate to BASEURL before every scenario
  const baseUrl = process.env.BASEURL;
  if (!baseUrl) {
    throw new Error("BASEURL environment variable is not defined");
  }
  await this.page.goto(baseUrl);
});

After(async function (this: CustomWorld, scenario) {
  const fileName = scenario.pickle.name.replace(/[^a-z0-9]/gi, "_");

   //  THIS BLOCK FOR THE FAILURE SCREENSHOT
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({
      path: `screenshots/${fileName}_failure.png`,
      type: "png",
    });
    this.attach(screenshot, "image/png");
  }
  // END OF BLOCK

  await this.context?.tracing.stop({
    path: `reports/traces/${fileName}.zip`,
  });

  await this.context?.close();
  await this.browser?.close();
});