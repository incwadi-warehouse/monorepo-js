// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('home', async ({ page }) => {
  await page.goto('/search')

  await expect(
    page.getByPlaceholder('Search in Title, Author or')
  ).toBeVisible()
})
