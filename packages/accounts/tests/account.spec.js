const { test, expect } = require('@playwright/test')

test('account', async ({ page }) => {
  await page.goto('/account')

  await expect(page).toHaveURL(/.*account/)

  await expect(page.getByText('Account (Experiment)')).toBeTruthy()
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
        tokenExpire: timestamp + 60,
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
        name: 'test',
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
    await route.fulfill({ json })
  })
})
