describe('Authors', () => {
  it('show list of authors', () => {
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
    cy.route('GET', '**/api/reservation/list', {})
    cy.route('GET', '**/api/bookmark', {})
    cy.route('GET', '**/api/author/find?term=**', [
      { id: 1, firstname: 'Jane', surname: 'Doe' },
      { id: 2, firstname: 'John', surname: 'Doe' },
    ])

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/author')

    cy.get('.search .input').type('test')

    cy.url().should('include', '/author?term=test')

    cy.get('.content section:nth-of-type(3) .list')
      .its('length')
      .should('eq', 2)

    cy.get('.button[type="reset"]').click()

    cy.url().should('not.include', '/author?term=test')
  })
})
