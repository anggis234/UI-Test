import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.burgerMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async goto(path: string = "/inventory.html") {
    await this.page.goto(path);
    await this.waitForPageReady();
  }

  async waitForPageReady() {
    await expect(this.pageTitle).toHaveText("Products");
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addItemToCart(productName: string) {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    await expect(productCard).toBeVisible();
    const addToCartButton = productCard.getByRole("button", { name: "Add to cart" });
    await addToCartButton.click();
  }

  async removeItemFromCart(productName: string) {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    const removeButton = productCard.getByRole("button", { name: "Remove" });
    await removeButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async expectCartBadgeCount(expectedCount: string) {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  async expectInventoryLoaded() {
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async logout() {
    await this.burgerMenuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }

  async expectCartBadgeEmpty() {
    await expect(this.cartBadge).not.toBeVisible();
  }
}
