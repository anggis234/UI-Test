import { test, expect } from "../../src/fixtures/base.fixture";
import { VALID_USER } from "../../src/test-data/users.data";
import {
  CHECKOUT_PRODUCT,
  CUSTOMER_INFO,
  CHECKOUT_SUMMARY,
  ORDER_CONFIRMATION,
} from "../../src/test-data/checkout.data";

test.describe("Checkout - End-to-End Flow", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await test.step("Precondition: Login as standard user and ensure inventory page is ready", async () => {
      await loginPage.goto("/");
      await loginPage.login(VALID_USER.username, VALID_USER.password);
      await inventoryPage.waitForPageReady();
    });
  });

  test(
    "Complete end-to-end checkout flow for Sauce Labs Onesie",
    { tag: ["@FE-05", "@Checkout", "@High", "@regression"] },
    async ({ page, inventoryPage, cartPage, checkoutPage }) => {
      await test.step("Add 'Sauce Labs Onesie' to cart", async () => {
        await inventoryPage.addItemToCart(CHECKOUT_PRODUCT.name);
      });

      await test.step("Verify shopping cart badge displays '1'", async () => {
        await inventoryPage.expectCartBadgeCount(CHECKOUT_PRODUCT.badgeCount);
      });

      await test.step("Navigate to Cart page via cart icon", async () => {
        await inventoryPage.goToCart();
        await cartPage.waitForPageReady();
        await expect(page).toHaveURL(/.*cart\.html/);
      });

      await test.step("Verify 'Sauce Labs Onesie' is listed in cart with matching price ($7.99)", async () => {
        await cartPage.expectItemInCart(CHECKOUT_PRODUCT.name, CHECKOUT_PRODUCT.price);
      });

      await test.step("Click Checkout button to navigate to Checkout Step One", async () => {
        await cartPage.clickCheckout();
        await checkoutPage.waitForStepOneReady();
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);
      });

      await test.step("Enter customer information (First Name, Last Name, Postal Code)", async () => {
        await checkoutPage.fillInformation(
          CUSTOMER_INFO.firstName,
          CUSTOMER_INFO.lastName,
          CUSTOMER_INFO.postalCode
        );
      });

      await test.step("Click Continue button to proceed to Checkout Step Two (Overview)", async () => {
        await checkoutPage.clickContinue();
        await checkoutPage.waitForStepTwoReady();
        await expect(page).toHaveURL(/.*checkout-step-two\.html/);
      });

      await test.step("Verify checkout overview summary (Item, Payment, Shipping, Subtotal, Tax, Total)", async () => {
        await checkoutPage.expectItemVisible(CHECKOUT_PRODUCT.name);
        await checkoutPage.expectSummaryDetails({
          paymentInfo: CHECKOUT_SUMMARY.paymentInfo,
          shippingInfo: CHECKOUT_SUMMARY.shippingInfo,
          itemTotal: CHECKOUT_SUMMARY.itemTotal,
          tax: CHECKOUT_SUMMARY.tax,
          total: CHECKOUT_SUMMARY.total,
        });
      });

      await test.step("Click Finish button to complete checkout", async () => {
        await checkoutPage.clickFinish();
        await checkoutPage.waitForCompleteReady();
        await expect(page).toHaveURL(/.*checkout-complete\.html/);
      });

      await test.step("Verify order completion confirmation and cart reset", async () => {
        await checkoutPage.expectOrderCompletion(
          ORDER_CONFIRMATION.header,
          ORDER_CONFIRMATION.description
        );
        await checkoutPage.expectCartBadgeCleared();
      });
    }
  );

  test(
    "Checkout Step One validation with missing information",
    { tag: ["@FE-06", "@Checkout", "@Medium", "@regression"] },
    async ({ page, inventoryPage, cartPage, checkoutPage }) => {
      await test.step("Precondition: Add item to cart and navigate to checkout step one", async () => {
        await inventoryPage.addItemToCart(CHECKOUT_PRODUCT.name);
        await inventoryPage.goToCart();
        await cartPage.waitForPageReady();
        await cartPage.clickCheckout();
        await checkoutPage.waitForStepOneReady();
      });

      await test.step("Leave all information fields empty and click Continue", async () => {
        await checkoutPage.clickContinue();
      });

      await test.step("Verify user remains on checkout step one with error message", async () => {
        await checkoutPage.expectErrorMessage("Error: First Name is required");
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);
      });
    }
  );
});
