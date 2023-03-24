describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion du stock');
    cy.get('a').contains('Voir le stock').click();
  });
});
