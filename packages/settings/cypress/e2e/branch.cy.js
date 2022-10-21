describe('branch', () => {
  it('show branch', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/branch')
    cy.url().should('include', '/branch')
  })
})
