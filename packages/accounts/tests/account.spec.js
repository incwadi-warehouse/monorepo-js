// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('user', async ({ page }) => {
  await page.goto('/account')

  await expect(page).toHaveURL(/.*account/)
  await expect(page.getByText('Account')).toBeVisible()
  await expect(page.getByText('Hello, admin!')).toBeVisible()
  await expect(page.getByText('test branch')).toBeVisible()
})

test('settings', async ({ page }) => {
  await page.goto('/account')

  await expect(page.getByText('Settings')).toBeVisible()
})

test('password', async ({ page }) => {
  await page.goto('/account')

  await expect(
    page.getByRole('link', { name: 'Change Password' })
  ).toBeVisible()
})

test('logout', async ({ page }) => {
  await page.goto('/account')

  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()

  await page.getByRole('button', { name: 'Logout' }).click()

  await expect(page).toHaveURL(/.*login/)
})

test.beforeEach(async ({ page, context }) => {
  // Cookies
  const timestamp = Date.now() / 1000

  const cookies = [
    {
      name: 'auth',
      value: JSON.stringify({
        token: 'token',
        refreshToken: 'refresh_token',
        tokenExpire: Math.round(timestamp + 60),
      }),
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
