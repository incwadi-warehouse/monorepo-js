// eslint-disable-next-line no-undef
import { test, expect } from '@playwright/test'

test('home', async ({ page }) => {
  await page.goto('/product/id')

  await expect(page.getByRole('heading', { name: 'Title' })).toBeVisible()
})

test.beforeEach(async ({ page }) => {
  await page.route('**/api/public/book/**', async (route) => {
    const json = {
      authorFirstname: 'Jon',
      authorSurname: 'Doe',
      branchName: 'Branch 1',
      branchOrdering: 'Info',
      cond: 'Good',
      currency: 'EUR',
      genre: 'Crime',
      id: '0002af24-dd81-11eb-8407-00155d30f6b7',
      price: 2.5,
      releaseYear: 2021,
      shortDescription: 'desc',
      title: 'Title',
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
