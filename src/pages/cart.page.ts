import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
  }

  async goto(path: string = "/cart.html") {
    await this.page.goto(path);
    await this.waitForPageReady();
  }

  async waitForPageReady() {
    await expect(this.pageTitle).toHaveText("Your Cart");
  }

  async expectItemInCart(productName: string, expectedPrice?: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
    if (expectedPrice) {
      await expect(item.locator(".inventory_item_price")).toHaveText(expectedPrice);
    }
  }

  async removeItem(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    const removeButton = item.getByRole("button", { name: "Remove" });
    await removeButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
