describe('Home', () => {
  it('Shows Home', () => {
    cy.visit('/')
    cy.url().should('include', '/')
  })
})
