describe('Authors', () => {
  it('update an author', () => {
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
    cy.route('GET', '**/api/author/1', {
      id: 1,
      firstname: 'Jane',
      surname: 'Doe',
    })

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/author/1')

    cy.get('#firstname').should('have.value', 'Jane')
    cy.get('#surname').should('have.value', 'Doe')

    cy.get('.btn.btn_primary')
  })
})
