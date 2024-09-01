import { test, expect } from "@playwright/test";

test("loads the home page", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("HOME");
});
