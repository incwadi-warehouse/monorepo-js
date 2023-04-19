// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('orders list', async ({ page }) => {
  await page.goto('/order')

  await expect(page).toHaveURL(/.*order/)
  await expect(page.getByText('Orders')).toBeVisible()
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
    const json = {
      id: 1,
      username: 'admin',
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      branch: {
        id: 1,
        name: 'test branch',
        steps: '0',
        currency: 'EUR',
        ordering: null,
        public: true,
        pricelist: null,
        cart: true,
        content: null,
      },
      isUser: true,
      isAdmin: true,
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
