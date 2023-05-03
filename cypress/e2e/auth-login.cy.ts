describe('Authentication', () => {

  it('User Can Login', () => {
    cy.visit('/user/login')

    cy.get('#mat-input-0').type('Lecomte72');
    cy.get('#mat-input-1').type('123456');
    cy.get('.mat-flat-button').click();
  })


  it('User Can Login and stay connected', () => {
    cy.visit('/user/login')

    cy.get('#mat-input-0').type('Lecomte72');
    cy.get('#mat-input-1').type('123456');
    cy.get('.mat-checkbox-inner-container').click();
    cy.get('#mat-checkbox-1-input').check();
    cy.get('.mat-flat-button').click();

  })

  it('User Can Logout', () => {
    cy.visit('/user/login')

    cy.get('#mat-input-0').type('Lecomte72');
    cy.get('#mat-input-1').type('123456');
    cy.get('.mat-flat-button').click();
    cy.get('.mat-menu-trigger > .rounded').click();
    cy.get('#menu-item-3 > .flex').click();
  })

})
