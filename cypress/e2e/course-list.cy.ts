describe('Course list test', () => {
  beforeEach(() => {
    const endPoint = 'http://127.0.0.1:5000/api/v1/course';
    cy.intercept('GET', endPoint, { fixture: 'courses.json' }).as('courses');
    cy.visit('/course/list');
  });

  it('Should contains 2 course', () => {
    const courseNumberPlaceHolder = cy.get('.course-number').eq(0);
    courseNumberPlaceHolder.contains('2 items');
  });
});
