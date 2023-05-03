describe('Should recover password and connect with new credentials', () => {

  let clipboardValue: string;

  it('Recover Password and find the user', () => {
    cy.visit('/user/login')

    cy.get('.text-xs').click();
    cy.get('#mat-input-2').type('Hubert.Laurène68');
    cy.get('#mat-input-3').type('Laurne.Hubert@hotmail.fr');
    cy.get('#submit-button > .mat-button-wrapper').click();

    cy.get('.mat-dialog-content > .cursor-pointer')
      .invoke('text')
      .then(textValue => {
        clipboardValue = textValue.trim()

        cy.get('.mat-dialog-actions > .mat-focus-indicator > .mat-button-wrapper').click();
        cy.get('#mat-input-0').type('Hubert.Laurène68');
        cy.get('#mat-input-1').type(clipboardValue);
        cy.get('.mat-flat-button').click();
      });
  })

})
