describe('Catalogue', () => {
  it('show catalogue button', () => {
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
    cy.route('GET', '**/api/inventory', {})
    cy.route('GET', '**/api/genre', {})
    cy.route('GET', '**/api/condition', {})
    cy.route('GET', '**/api/format', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/search')

    cy.get('.btn.btn_primary')
  })
})
