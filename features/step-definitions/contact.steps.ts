import { Given, When, Then } from "@cucumber/cucumber";
import { ContactPage } from "../../pages/ContactPage";
import { CustomWorld } from "../support/world";


Given('I navigate to the Contact page', { timeout: 100 * 1000 },
    async function (this: CustomWorld) {
        this.contactPage = new ContactPage(this.page);
        await this.contactPage.navigateToContactPage();
    });

When('I click the Submit button', { timeout: 100 * 1000 },
    async function (this: CustomWorld) {
        await this.contactPage.submitForm();
    });

Then('I should see validation errors for mandatory fields', { timeout: 100 * 1000 },
    async function (this: CustomWorld) {
        await this.contactPage.verifyValidationErrors();
    });

When('I enter valid contact details {string} {string} {string}', { timeout: 100 * 1000 },
    async function (this: CustomWorld, forename, email, message) {
        await this.contactPage.enterMandatoryFields(forename, email, message);
    }
);

Then('all validation errors should be cleared', { timeout: 100 * 1000 },
    async function (this: CustomWorld) {
        await this.contactPage.verifyValidationErrorsCleared();
    });

Then("I should see a successful submission message", { timeout: 100 * 1000 },
    async function (this: CustomWorld) {
        await this.contactPage.verifySuccessMessage();
    }
);