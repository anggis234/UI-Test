import { test, expect } from "../../src/fixtures/base.fixture";
import { VALID_USER, LOCKED_USER, INVALID_USER } from "../../src/test-data/users.data";

test.describe("Authentication - Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto("/");
  });

  test(
    "Login with valid credentials",
    { tag: ["@FE-01", "@Login", "@High", "@regression"] },
    async ({ loginPage, inventoryPage, page }) => {
      await test.step("Enter valid username and password", async () => {
        await loginPage.login(VALID_USER.username, VALID_USER.password);
      });

      await test.step("Verify user redirected to inventory page with products displayed", async () => {
        await inventoryPage.waitForPageReady();
        await expect(page).toHaveURL(/.*inventory\.html/);
        await expect(inventoryPage.pageTitle).toHaveText("Products");
        await inventoryPage.expectInventoryLoaded();
      });
    }
  );

  test(
    "Login with locked out user credentials",
    { tag: ["@FE-02", "@Login", "@Medium", "@negative", "@regression"] },
    async ({ loginPage, page }) => {
      await test.step("Enter locked_out_user credentials and click Login", async () => {
        await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);
      });

      await test.step("Verify error message indicates user is locked out", async () => {
        await loginPage.expectErrorMessage("Epic sadface: Sorry, this user has been locked out.");
        await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
      });
    }
  );

  test(
    "Login with invalid password",
    { tag: ["@FE-03", "@Login", "@Medium", "@negative", "@regression"] },
    async ({ loginPage, page }) => {
      await test.step("Enter valid username with wrong password and click Login", async () => {
        await loginPage.login(VALID_USER.username, INVALID_USER.password);
      });

      await test.step("Verify credentials mismatch error message", async () => {
        await loginPage.expectErrorMessage(
          "Epic sadface: Username and password do not match any user in this service"
        );
        await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
      });
    }
  );

  test(
    "Login with empty credentials",
    { tag: ["@FE-04", "@Login", "@Low", "@negative", "@regression"] },
    async ({ loginPage, page }) => {
      await test.step("Leave username and password empty and click Login", async () => {
        await loginPage.loginButton.click();
      });

      await test.step("Verify username required error message", async () => {
        await loginPage.expectErrorMessage("Epic sadface: Username is required");
        await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
      });
    }
  );

  test(
    "Logout from application",
    { tag: ["@FE-08", "@Authentication", "@Low", "@regression"] },
    async ({ loginPage, inventoryPage, page }) => {
      await test.step("Precondition: Login as standard user and reach inventory page", async () => {
        await loginPage.login(VALID_USER.username, VALID_USER.password);
        await inventoryPage.waitForPageReady();
      });

      await test.step("Open burger menu and click Logout", async () => {
        await inventoryPage.logout();
      });

      await test.step("Verify redirected to login page with login form visible", async () => {
        await loginPage.waitForPageReady();
        await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
      });
    }
  );
});
