describe('Show Book', () => {
  it('Shows details', () => {
    cy.server()
    cy.route('GET', '**/api/public/book/**', {
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
    })

    cy.visit('/product/id')
    cy.url().should('include', '/product')
  })
})
