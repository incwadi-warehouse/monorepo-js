// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('search bar', async ({ page }) => {
  await page.goto('/find')

  await expect(
    page.getByPlaceholder('Search in Title, Author or')
  ).toBeVisible()

  await page.getByPlaceholder('Search in Title, Author or').fill('test')

  await page.getByRole('button').nth(1).click()

  await expect(page).toHaveURL(/.*term=test.*/)

  await page.locator('form').getByRole('button').first().click()

  await expect(page).toHaveURL(/.*home$/)
})

test('genres', async ({ page }) => {
  await page.goto('/find')

  await expect(page.getByText('Genres')).toBeVisible()

  await page.getByText('Genres').click()

  await page.getByText('Novels').click()

  await expect(page).toHaveURL(/.*genre=1.*/)

  await page.locator('form').getByRole('button').first().click()

  await expect(page).toHaveURL(/.*home$/)
})

test('search results', async ({ page }) => {
  await page.goto('/find')

  await page.getByRole('button').nth(1).click()

  await expect(page.getByText('Title 1')).toBeVisible()

  await expect(page.locator('.list')).toHaveCount(23)

  await page.locator('form').getByRole('button').first().click()

  await expect(page).toHaveURL(/.*home$/)
})

test('pagination', async ({ page }) => {
  await page.goto('/find')

  await page.getByText('Forward >').click()

  await expect(page).toHaveURL(/.*page=2.*/)

  await page.getByText('< Back').click()

  await expect(page).toHaveURL(/.*page=1.*/)

  await page.getByText('2', { exact: true }).click()

  await expect(page).toHaveURL(/.*page=2.*/)

  await page.getByText('1', { exact: true }).click()

  await expect(page).toHaveURL(/.*page=1.*/)

  await page.locator('form').getByRole('button').first().click()

  await expect(page).toHaveURL(/.*home$/)
})

test.beforeEach(async ({ page }) => {
  await page.route('**/api/public/genre/1', async (route) => {
    const json = [
      {
        id: 1,
        name: 'Novels',
      },
      {
        id: 2,
        name: 'Thriller',
      },
    ]
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      json,
    })
  })

  await page.route('**/api/public/book/find**', async (route) => {
    const json = {
      books: [
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 1',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
        {
          id: '000082a8-bf2e-11ed-9b9c-0242ac140006',
          currency: 'EUR',
          title: 'Title 2',
          shortDescription: 'Description',
          authorFirstname: 'Jane',
          authorSurname: 'Doe',
          genre: 'crime',
          price: 1.5,
          releaseYear: 2007,
          branchName: '',
          branchOrdering: '',
          cond: null,
          format_name: 'Paperback',
          subtitle: 'subtitle',
        },
      ],
      counter: 23,
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
