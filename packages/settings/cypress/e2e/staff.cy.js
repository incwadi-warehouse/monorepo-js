describe('staff', () => {
  it('show staff', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/staff')
    cy.url().should('include', '/staff')
  })
})
