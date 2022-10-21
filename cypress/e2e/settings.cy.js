describe('settings', () => {
  it('show settings', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/')
    cy.url().should('include', '/')
  })
})
