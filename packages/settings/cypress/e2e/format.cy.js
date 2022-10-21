describe('format', () => {
  it('show format', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/format')
    cy.url().should('include', '/format')
  })
})
