describe('Unhappy - Add Toilet missing location', () => {
  before(() => {
    cy.fixture('user').then(f => cy.wrap(f.user).as('userCreds'));
  });

  it('logs in and tries to submit add toilet without location and sees error', function () {
    // register/login via API (ignore 400 if exists)
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL') || 'http://localhost:4000'}/api/auth/register`,
      body: { name: this.userCreds.name, email: this.userCreds.email, password: this.userCreds.password },
      failOnStatusCode: false
    });

    cy.visit('/login');
    cy.get('input[placeholder="email"]').type(this.userCreds.email);
    cy.get('input[placeholder="password"]').type(this.userCreds.password);
    cy.get('button').contains('Login').click();

    cy.get('a').contains('Add Toilet').click();

    // fill only name and description, leave location empty
    cy.get('input[placeholder="Toilet name"]').type('NoLoc Toilet');
    cy.get('textarea[placeholder="Short description"]').type('Missing location test');

    // Intercept window:alert to capture the failure message from frontend
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('button').contains('Add Toilet').click().then(() => {
      // backend returns 400, frontend catch shows alert 'Failed to add toilet'
      expect(stub.getCall(0)).to.be.calledWithMatch(/Failed to add toilet|name and location required/i);
    });
  });
});
