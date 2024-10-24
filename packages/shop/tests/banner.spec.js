// eslint-disable-next-line no-undef
import { test, expect } from '@playwright/test'

test('show banner', async ({ page }) => {
  await page.goto('/home')

  await expect(page.getByText('Our store will be closed')).toBeVisible()
})

test('close banner', async ({ page }) => {
  await page.goto('/home')

  await page.locator('span:has-text("close")').click()


  await expect(page.getByText('Our store will be closed')).toBeHidden()
})

test.beforeEach(async ({ page }) => {
  await page.route('**/api/public/branch/show/1', async (route) => {
    const json = {
      id: 1,
      name: 'Hamburg',
      content:
        '**Our store will be closed tomorrow for maintenance work.**\n\nWe are looking forward to provide you with the best service again the day after tomorrow. Thanks for being a loyal customer!',
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      json,
    })
  })
})
