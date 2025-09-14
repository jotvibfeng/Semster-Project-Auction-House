import { test, expect } from "@playwright/test";

console.log(
  "EMAIL:",
  process.env.VITE_USER_EMAIL,
  "PASSWORD:",
  process.env.VITE_USER_PASSWORD
);

const validEmail = process.env.VITE_USER_EMAIL;
const validPassword = process.env.VITE_USER_PASSWORD;
const invalidEmail = "wrong@example.com";
const invalidPassword = "wrongpassword";

test.describe("Login Test", () => {
  test("User can successfully login with valid credentials", async ({
    page,
  }) => {
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', validPassword);
    await page.click('button[type="submit"]');

    // Wait for navigation or a successful login indicator
    await page.waitForURL(/listing\.html$/);

    // Optionally, check for a token in localStorage
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).not.toBeNull();
  });

  test("User sees an error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.fill('input[name="email"]', invalidEmail);
    await page.fill('input[name="password"]', invalidPassword);
    await page.click('button[type="submit"]');

    // Wait for the error message to appear
    await expect(page.locator("#message")).toContainText(/invalid|wrong/i);
  });
});
