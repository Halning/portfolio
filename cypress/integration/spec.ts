it('loads examples', () => {
  cy.visit('/');
  cy.get('app-root').contains('Welcome');
});
