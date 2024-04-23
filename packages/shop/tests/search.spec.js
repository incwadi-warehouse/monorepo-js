// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('home', async ({ page }) => {
  await page.goto('/search')

  await expect(
    page.getByPlaceholder('Search in Title, Author or')
  ).toBeVisible()
})

test('recommendation', async ({ page }) => {
  await page.goto('/search')

  await expect(
    page.getByRole('heading', { name: 'Recommendations' })
  ).toBeVisible()
})

test('search results', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('button').nth(1).click()

  await expect(page.getByText('book 1')).toBeVisible()
})

test.beforeEach(async ({ page }) => {
  await page.route('**/api/public/book/recommendation/**', async (route) => {
    const json = {
      books: [
        {
          id: '1',
          currency: 'EUR',
          title: 'book 1',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          price: 0,
          cover_s: null,
          cover_m: null,
          cover_l: null,
        },
        {
          id: '2',
          currency: 'EUR',
          title: 'book 2',
          authorFirstname: 'John',
          authorSurname: 'Doe',
          price: 0,
          cover_s: null,
          cover_m: null,
          cover_l: null,
        },
      ],
      counter: 2,
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

  await page.route('**/api/public/book/find?options=**', async (route) => {
    const json = {
      books: [
        {
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
        },
      ],
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

