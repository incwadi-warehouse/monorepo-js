// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('update password', async ({ page }) => {
  await page.goto('/password')

  await expect(page).toHaveURL(/.*password/)
  await expect(page.getByText('Password (Experiment)')).toBeVisible()
  await expect(page.getByRole('link', { name: '⟨ Account' })).toBeVisible()
  await expect(page.getByText('Password (Experiment)')).toBeVisible()
})

test('update password successful', async ({ page }) => {
  await page.goto('/password')

  await page.getByLabel('New Password').fill('password')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByText('Password updated')).toBeVisible()
})

test('update password fails', async ({ page }) => {
  await page.goto('/password')

  await page.getByLabel('New Password').fill('123')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByText('Could not update password')).toBeVisible()
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

  await page.route('http://localhost:8000/api/password', async (route) => {
    console.log('PASS: ', route.request().postDataJSON().password)
    const json = {
      msg:
        route.request().postDataJSON().password === 'password'
          ? 'PASSWORD_CHANGED'
          : 'PASSWORD_NOT_CHANGED',
    }
    await route.fulfill({
      status:
        route.request().postDataJSON().password === 'password' ? 200 : 400,
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      json,
    })
  })
})
