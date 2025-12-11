describe('Flow 1 - Add Toilet (happy)', () => {
  before(() => {
    cy.fixture('user').then(f => {
      cy.wrap(f.user).as('userCreds');
    });
  });

  // Keep the uncaught exception handler to prevent Cypress from failing early on an unhandled promise rejection
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('logs in, opens Add Toilet, fills and submits form', function () {
    // ensure user exists - try register (ignore if exists)
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL') || 'http://localhost:4000'}/api/auth/register`,
      body: { name: this.userCreds.name, email: this.userCreds.email, password: this.userCreds.password },
      failOnStatusCode: false
    });

    // login via UI
    cy.visit('/login');
    cy.get('input[placeholder="email"]').type(this.userCreds.email);
    cy.get('input[placeholder="password"]').type(this.userCreds.password);
    cy.get('button').contains('Login').click();

    // after login redirect to home
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // navigate to add page
    cy.get('a').contains('Add Toilet').click();
    cy.url().should('contain', '/add');

    // fill form
    const name = `E2E Toilet ${Date.now()}`;
    cy.get('input[placeholder="Toilet name"]').type(name);
    cy.get('textarea[placeholder="Short description"]').type('E2E test toilet');

    // set location inputs
    cy.get('input[placeholder="Latitude"]').type('37.98');
    cy.get('input[placeholder="Longitude"]').type('23.72');

    // toggle an amenity
    cy.get('input[name="wheelchair"]').check();

    // The alert message received by the front-end will be "Failed to add toilet" because of the 500 error.
    // We stub the alert to prevent the test from hanging and check the *correct* expected message.
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // submit
    cy.get('button').contains('Add Toilet').click();

    // 
    // CRITICAL: The API call fails, so the test needs to wait for the failure state.
    // Since this is a "happy path" test, we are expecting success.
    // This line will fail until the backend fix is applied.
    cy.wait(500).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWithMatch(/successfully added|Pending/i);
    });
    
    // After a successful submission (which is the happy path goal), the app redirects to home.
    // We wait for the URL assertion to pass.
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});