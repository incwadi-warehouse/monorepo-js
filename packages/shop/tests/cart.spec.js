// eslint-disable-next-line no-undef
import { test, expect } from '@playwright/test'

test('Cart panel', async ({ page }) => {
  await page.goto('/');

  // Open the cart panel
  await page.keyboard.press('Alt+KeyC');
  await expect(page.locator('.container.position_right')).toBeVisible();

  // Check if the cart list is visible
  await expect(page.getByRole('link', { name: 'book' }).first()).toBeVisible();

  // Proceed to checkout
  await page.locator('button:has-text("Continue")').click();

  // Check if the checkout form is visible
  await expect(page.locator('label:has-text("Firstname")')).toBeVisible();

  // Go back to the cart list
  await page.locator('button:has-text("Back")').click();

  // Check if the cart list is visible again
  await expect(page.getByRole('link', { name: 'book' }).first()).toBeVisible();

  // Close the cart panel
  await page.locator('.overlay').click();
  await expect(page.locator('.container.position_right')).toBeHidden();
})

test.beforeEach(async ({ page }) => {
  await page.goto('/')

  await page.evaluate(() => {
    localStorage.setItem('cart', JSON.stringify([{ id: 1, title: 'book', price: 1 }]))
  })
})
