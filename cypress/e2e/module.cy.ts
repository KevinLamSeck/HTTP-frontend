describe('should create a module', () => {
  it('passes', () => {
    cy.visit('/user/login')

    cy.get('#mat-input-0').type('Lecomte72');
    cy.get('#mat-input-1').type('123456');
    cy.get('.mat-flat-button').click();

    cy.get(':nth-child(2) > .mat-button-wrapper').click();
    cy.get('#mat-input-2').clear('Git Branching and Merging ');
    cy.get('#mat-input-2').type('Git Branching and Merging');
    cy.get('#mat-input-3').clear();
    cy.get('#mat-input-3').type('In this module, you will learn how to use Git branching and merging to manage and collaborate on software projects. ');
    cy.get('.lg\\:items-center > .flex-col > :nth-child(3) > :nth-child(1)').click();
    cy.get('.list-none > :nth-child(1)').click();
    cy.get('.lg\\:items-center > .flex-col > .justify-center > .mat-focus-indicator').click();
  })
})
