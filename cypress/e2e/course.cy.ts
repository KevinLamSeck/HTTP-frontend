describe('template spec', () => {
  it('should create a course', () => {
    cy.visit('/user/login')

    cy.get('#mat-input-0').type('Lecomte72');
    cy.get('#mat-input-1').type('123456');
    cy.get('.mat-flat-button').click();

    cy.get('.action-user > :nth-child(1)').click();
    cy.get('#mat-input-2').click();
    cy.get('#mat-input-2').clear('Mastering Git: A Comprehensive Guide to Version Control');
    cy.get('#mat-input-2').type('Mastering Git: A Comprehensive Guide to Version Control');
    cy.get('.mat-form-field.ng-tns-c101-10 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
    cy.get('#mat-input-3').clear();
    cy.get('#mat-input-3').type(' In this course, you will learn how to use Git, the popular version control system used by developers worldwide.');
    cy.get('form.ng-tns-c172-8 > .flex-row > :nth-child(1)').click();
    cy.get('#mat-input-4').clear('I');
    cy.get('#mat-input-4').type('Introduction to Git');
    cy.get('#mat-input-5').clear('L');
    cy.get('#mat-input-5').type('Learn your first git command.');
    cy.get('[cdkfocusinitial=""]').click();
    cy.get('form.ng-tns-c172-8 > div.justify-center > .mat-focus-indicator > .mat-button-wrapper').click();

  })
})
