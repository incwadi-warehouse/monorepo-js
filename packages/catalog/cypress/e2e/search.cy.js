describe('Search', () => {
  it('show search', () => {
    cy.server()
    cy.route('GET', '**/api/me', {
      id: 1,
      username: 'admin',
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      branch: {
        id: 1,
      },
      isUser: true,
      isAdmin: true,
    })

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/search')
    cy.url().should('include', '/search')
  })

  it('add term to query', () => {
    cy.server()
    cy.route('GET', '**/api/me', {
      id: 1,
      username: 'admin',
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      branch: {
        id: 1,
      },
      isUser: true,
      isAdmin: true,
    })
    cy.route('GET', '**/api/book/find?options=**', {
      books: [
        {
          id: '1',
          added: 1644796800,
          title: 'book 1',
          author: {
            id: 1,
            firstname: 'Jane',
            surname: 'Doe',
          },
          genre: {
            id: 1,
            name: 'genre 1',
          },
          price: 0,
          sold: false,
          soldOn: null,
          removed: false,
          removedOn: null,
          reserved: false,
          reservedAt: null,
          releaseYear: 2022,
          reservation_id: null,
          recommendation: false,
          inventory: null,
          format: {
            id: 2,
            name: 'format 1',
          },
        },
        {
          id: '2',
          added: 1644796800,
          title: 'book 2',
          author: {
            id: 1,
            firstname: 'John',
            surname: 'Doe',
          },
          genre: {
            id: 2,
            name: 'genre 2',
          },
          price: 0,
          sold: false,
          soldOn: null,
          removed: false,
          removedOn: null,
          reserved: false,
          reservedAt: null,
          releaseYear: 2022,
          reservation_id: null,
          recommendation: false,
          inventory: null,
          format: {
            id: 2,
            name: 'format 1',
          },
        },
      ],
      counter: 2,
    })
    cy.route('GET', '**/api/author/find?options=**', {})

    cy.get('.input').type('test')
    cy.url().should('include', 'term=test')

    cy.get('table')
  })
})
