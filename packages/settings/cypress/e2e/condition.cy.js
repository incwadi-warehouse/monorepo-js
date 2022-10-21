describe('condition', () => {
  it('show condition', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/condition')
    cy.url().should('include', '/condition')
  })
})
