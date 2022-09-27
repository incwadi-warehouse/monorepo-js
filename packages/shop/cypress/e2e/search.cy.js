describe('Search', () => {
  it('Shows home view', () => {
    cy.visit('/search')
    cy.get('h3')
  })
})

describe('Search', () => {
  it('show recommendations', () => {
    cy.server()
    cy.route('get', '**/api/public/book/recommendation/**', {
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
    })

    cy.visit('/search')

    cy.get('.slider > div').should('have.length', 2)
    cy.get(':nth-child(4) > .container').contains('book 1')
  })
})

describe('Find no book', () => {
  it('Shows list of books', () => {
    cy.server()
    cy.route('GET', '**/api/public/book/find?options=**', {
      books: [],
    })
    cy.get('input[type=search]').type('test')
    cy.url().should('include', 'term=test')
    cy.get('div.alert.type_warning')
  })
})

describe('Find books', () => {
  it('Shows list of books', () => {
    cy.get('button[type=reset].button').click()
    cy.server()
    cy.route('GET', '**/api/public/book/find?options=**', {
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
    })
    cy.get('input[type=search]').type('test')
    cy.url().should('include', 'term=test')
    cy.get('div').should('has.class', 'list')
    cy.get('div.alert_warning').should('not.exist')
  })
})
