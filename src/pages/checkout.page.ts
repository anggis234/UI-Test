import { expect, type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly stepOneCancelButton: Locator;
  readonly errorMessage: Locator;
  readonly cartItems: Locator;
  readonly paymentInfoLabel: Locator;
  readonly shippingInfoLabel: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly stepTwoCancelButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.stepOneCancelButton = page.getByRole("button", { name: "Cancel" });
    this.errorMessage = page.locator('[data-test="error"]');
    this.cartItems = page.locator(".cart_item");
    this.paymentInfoLabel = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-value"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.stepTwoCancelButton = page.getByRole("button", { name: "Cancel" });
    this.completeHeader = page.getByRole("heading", { name: "Thank you for your order!" });
    this.completeText = page.locator('[data-test="complete-text"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.backHomeButton = page.getByRole("button", { name: "Back Home" });
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async gotoStepOne(path: string = "/checkout-step-one.html") {
    await this.page.goto(path);
    await this.waitForStepOneReady();
  }

  async waitForStepOneReady() {
    await expect(this.pageTitle).toHaveText("Checkout: Your Information");
    await expect(this.continueButton).toBeVisible();
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (postalCode) await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async expectErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async gotoStepTwo(path: string = "/checkout-step-two.html") {
    await this.page.goto(path);
    await this.waitForStepTwoReady();
  }

  async waitForStepTwoReady() {
    await expect(this.pageTitle).toHaveText("Checkout: Overview");
    await expect(this.finishButton).toBeVisible();
  }

  async expectItemVisible(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  async expectSummaryDetails(summary: {
    paymentInfo?: string;
    shippingInfo?: string;
    itemTotal?: string;
    tax?: string;
    total?: string;
  }) {
    if (summary.paymentInfo) {
      await expect(this.paymentInfoLabel).toHaveText(summary.paymentInfo);
    }
    if (summary.shippingInfo) {
      await expect(this.shippingInfoLabel).toHaveText(summary.shippingInfo);
    }
    if (summary.itemTotal) {
      await expect(this.itemTotalLabel).toContainText(summary.itemTotal);
    }
    if (summary.tax) {
      await expect(this.taxLabel).toContainText(summary.tax);
    }
    if (summary.total) {
      await expect(this.totalLabel).toContainText(summary.total);
    }
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async gotoComplete(path: string = "/checkout-complete.html") {
    await this.page.goto(path);
    await this.waitForCompleteReady();
  }

  async waitForCompleteReady() {
    await expect(this.pageTitle).toHaveText("Checkout: Complete!");
    await expect(this.completeHeader).toBeVisible();
  }

  async expectOrderCompletion(headerText?: string, descriptionText?: string) {
    if (headerText) {
      await expect(this.completeHeader).toHaveText(headerText);
    } else {
      await expect(this.completeHeader).toBeVisible();
    }

    if (descriptionText) {
      await expect(this.completeText).toHaveText(descriptionText);
    } else {
      await expect(this.completeText).toBeVisible();
    }

    await expect(this.ponyExpressImage).toBeVisible();
  }

  async expectCartBadgeCleared() {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}
