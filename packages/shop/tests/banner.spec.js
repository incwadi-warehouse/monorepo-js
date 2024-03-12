// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('banner', async ({ page }) => {
  await page.goto('/search')

  await expect(page.getByText('Our store will be closed')).toBeVisible()
})
