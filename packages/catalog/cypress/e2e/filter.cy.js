describe('Filter', () => {
  it('add options to query', () => {
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
    cy.route('GET', '**/api/genre', [
      {
        id: 1,
        name: 'genre 1',
        branch: {},
        books: 1,
      },
      {
        id: 2,
        name: 'genre 2',
        branch: {},
        books: 1,
      },
    ])
    cy.route('GET', '**/api/format', [
      {
        id: 1,
        name: 'format 1',
        branch: {},
      },
      {
        id: 2,
        name: 'format 2',
        branch: {},
      },
    ])
    cy.route('GET', '**/api/branch', [
      {
        id: 1,
        name: 'branch 1',
      },
      {
        id: 2,
        name: 'branch 2',
      },
    ])
    cy.route('GET', '**/api/bookmark', {})
    cy.route('GET', '**/api/reservation/list', {})
    cy.route('GET', '**/api/inventory', {})
    cy.route('GET', '**/api/condition', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/search')
    cy.get('.button[type=button]').click()

    // branch
    cy.get('.container > article:nth-child(1) > span').click()
    cy.get(':nth-child(1) > .dropdown > .isBold > .title').click()

    // genre
    cy.get('.container > article:nth-child(2) > span').click()
    cy.get('.container > article:nth-child(2) input[id$=genre-0]').click()
    cy.get('.container > article:nth-child(2) > .overlay').click()

    // release year
    cy.get('article:nth-child(3) > span').click()
    cy.get('article:nth-child(3) input[id$=range-start]').click()
    cy.get('article:nth-child(3) input[id$=range-start]').type('2020')
    cy.get('article:nth-child(3) input[id$=range-end]').click()
    cy.get('article:nth-child(3) input[id$=range-end]').type('2022')
    cy.get('article:nth-child(3) > .overlay').click({ force: true })

    // availability
    cy.get('article:nth-child(4) > span').click()
    cy.get('article:nth-child(4) input[id$=genre-0]').click()
    cy.get('article:nth-child(4) > .overlay').click()

    // format
    cy.get('article:nth-child(5) > span').click()
    cy.get('article:nth-child(5) input[id$=genre-0]').click()
    cy.get('article:nth-child(5) > .overlay').click()

    // added
    cy.get('article:nth-child(6) > span').click()
    cy.get('article:nth-child(6) input[id$=range-start]').click()
    cy.get('article:nth-child(6) input[id$=range-start]').type('2022-05-01')
    cy.get('article:nth-child(6) input[id$=range-end]').click()
    cy.get('article:nth-child(6) input[id$=range-end]').type('2022-05-31')
    cy.get('article:nth-child(6) > .overlay').click({ force: true })

    // order by
    cy.get('article:nth-child(7) > span').click()
    cy.get(':nth-child(7) > .dropdown > :nth-child(1) > .title').click()

    // order by direction
    cy.get('article:nth-child(8) > span').click()
    cy.get(':nth-child(8) > .dropdown > :nth-child(2) > .title').click()

    // // limit
    cy.get('#limit').click()
    cy.get('#limit').type('{backspace}')
    cy.get('#limit').type('{backspace}')
    cy.get('#limit').type('51')

    // submit
    cy.get('.item > .btn_primary').click()

    cy.url().should('include', 'branch=1')
    cy.url().should('include', 'genre=1')
    cy.url().should('include', 'releaseYear=2020..2022')
    cy.url().should('include', 'availability=sold')
    cy.url().should('include', 'format=1')
    cy.url().should('include', 'added=2022-05-01..2022-05-31')
    cy.url().should('include', 'orderBy=title')
    cy.url().should('include', 'orderByDirection=desc')
    cy.url().should('include', 'limit=51')
  })
})
