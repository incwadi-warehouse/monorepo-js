// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('genre', async ({ page }) => {
  await page.goto('/genre')

  await expect(page.getByText('This is your about text.')).toBeVisible()
})

test.beforeEach(async ({ page, context }) => {
  // Cookies
  const cookies = [
    {
      name: 'token',
      value: 'token',
      path: '/',
      domain: 'localhost',
    },
    {
      name: 'refresh_token',
      value: 'refresh_token',
      path: '/',
      domain: 'localhost',
    },
  ]
  await context.addCookies(cookies)

  // API
  await page.route('http://localhost:8000/api/me', async (route) => {
    const json = {}
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
