import { expect, Locator, Page, } from "@playwright/test";

export class ContactPage {

    readonly page: Page;
    readonly contactLink: Locator;
    readonly submitButton: Locator;

    readonly forename: Locator;
    readonly email: Locator;
    readonly message: Locator;

    readonly forenameError: Locator;
    readonly emailError: Locator;
    readonly messageError: Locator;

    readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.contactLink = page.getByRole('link', { name: 'Contact' });
        this.submitButton = page.getByRole('link', { name: 'Submit' });

        this.forename = page.locator('#forename');
        this.email = page.locator('#email');
        this.message = page.locator('#message');

        this.forenameError = page.locator('#forename-err');
        this.emailError = page.locator('#email-err');
        this.messageError = page.locator('#message-err');

        this.successMessage = page.locator(".alert-success");
    }

    async navigateToContactPage(): Promise<void> {
        await this.contactLink.click();
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async enterMandatoryFields(forename: string, email: string, message: string
    ): Promise<void> {

        await this.forename.fill(forename);
        await this.email.fill(email);
        await this.message.fill(message);
        await this.page.waitForTimeout(500);
    }

    async verifyValidationErrors(): Promise<void> {
        await this.page.waitForTimeout(500);
        await expect(this.forenameError).toHaveText('Forename is required');
        await expect(this.emailError).toHaveText('Email is required');
        await expect(this.messageError).toHaveText('Message is required');
    }

    async verifyValidationErrorsCleared(): Promise<void> {

        await expect(this.forenameError).toBeHidden();
        await expect(this.emailError).toBeHidden();
        await expect(this.messageError).toBeHidden();
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible({ timeout: 20000 });
        await expect(this.successMessage).toContainText("we appreciate your feedback");

    }

}