describe('Media Spec', () => {
  let idOfMedia: any;

  it('should create a media with a files uploaded', () => {
    cy.visit('/user/login');
    cy.get('#mat-input-0').type('Lecomte72');
    cy.get('#mat-input-1').type('123456');
    cy.get('.mat-flat-button').click();
    cy.get(':nth-child(3) > .mat-button-wrapper').click();
    cy.get('#mat-select-value-1').click();
    cy.get('#mat-option-7 > .mat-option-text').click();
    cy.get('#mat-input-2').type('Git CheatSheed');
    cy.get('#mat-input-3').clear();
    cy.get('#mat-input-3').type('Useful Commands with git');
    cy.get('#mat-input-4').type('300');

    cy.get('#fileToUpload').selectFile('cypress/fixtures/git.pdf');

    cy.intercept('POST', 'http://127.0.0.1:5000/api/v1/medias').as('mediaPost');

    cy.get('.flex > .mat-focus-indicator > .mat-button-wrapper').click();

    cy.wait('@mediaPost').then(({ request, response }) => {
      const requestData = request.body;
      const responseData = response!.body;
      console.log('Request data:', requestData);
      console.log('Response data:', responseData);

      idOfMedia = responseData.id;

      cy.get(`#${idOfMedia} > .flex-1`).click();
      cy.get(
        `#${idOfMedia} > .mat-focus-indicator > .mat-button-wrapper > .material-icons`
      ).click();

      cy.get('.hover\\:bg-sky-400').click();
      cy.get('#mat-input-5').clear('Git CheatShee');
      cy.get('#mat-input-5').type('Git CheatSheet');
      cy.get(
        '.mx-auto > .flex-col > .justify-center > .mat-focus-indicator > .mat-button-wrapper'
      ).click();
    });
  });
});
