// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('login', async ({ page }) => {
  await page.route('http://localhost:8000/api/login_check', async (route) => {
    const json = {
      token: 'token',
      refresh_token: 'refresh_token',
    }
    await route.fulfill({ json })
  })

  await page.route('http://localhost:8000/api/me', async (route) => {
    const json = {}
    await route.fulfill({ json })
  })

  await page.goto('/login')

  await expect(page).toHaveURL(/.*login/)

  await page.getByLabel('Username').fill('admin')
  await page.getByLabel('Password').fill('password')

  await page.getByRole('button', { name: 'Login' }).click()
})
