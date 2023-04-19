// eslint-disable-next-line no-undef
const { test, expect } = require('@playwright/test')

test('orders list', async ({ page }) => {
  await page.goto('/order')

  await expect(page).toHaveURL(/.*order/)
  await expect(page.getByText('Orders')).toBeVisible()
  // await expect(
  //   page.getByRole('link', { name: 'Order from 4/18/2023' })
  // ).toBeVisible()
  await expect(page.getByText('new')).toBeVisible()
  // await expect(page.getByRole('link', { name: 'Details' })).toBeVisible()
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

  await page.route(
    'http://localhost:8000/api/reservation/list',
    async (route) => {
      const json = [
        {
          id: 'fe41e987-ddcd-11ed-928e-0242ac150002',
          branch: {},
          createdAt: 1681811231,
          notes: '',
          books: [
            {
              id: 'af5e6199-dd0d-11ed-928e-0242ac150002',
              branch: {},
              added: 1681728636,
              title: 'Demo Book 1',
              shortDescription: null,
              author: { id: 1, firstname: 'John', surname: 'Doe' },
              genre: {
                id: 1,
                name: 'Crime',
                branch: {},
                books: 50,
              },
              price: 1,
              sold: false,
              soldOn: null,
              removed: false,
              removedOn: null,
              reserved: true,
              reservedAt: 1681811232,
              releaseYear: 2023,
              condition: null,
              tags: [],
              reservation_id: 'fe41e987-ddcd-11ed-928e-0242ac150002',
              recommendation: false,
              inventory: null,
              format: null,
              subtitle: null,
              duplicate: false,
            },
          ],
          salutation: 'w',
          firstname: 'Jane',
          surname: 'Doe',
          mail: '',
          phone: '',
          open: true,
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
    }
  )
})
