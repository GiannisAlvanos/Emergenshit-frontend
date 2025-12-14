describe('Flow 2 - Review (happy)', () => {
  before(() => {
    cy.fixture('user').then(f => cy.wrap(f.user).as('userCreds'));
  });

  it('creates an active toilet via API, visits details and posts review', function () {
    // create/register and login via API
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL') || 'http://localhost:4000'}/api/auth/register`,
      body: { name: this.userCreds.name, email: this.userCreds.email, password: this.userCreds.password },
      failOnStatusCode: false
    }).then(()=> {
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL') || 'http://localhost:4000'}/api/auth/login`,
        body: { email: this.userCreds.email, password: this.userCreds.password }
      });
    }).then((res) => {
      const token = res.body?.data?.token || res.body?.token;
      expect(token).to.exist;

      // create toilet directly via API and mark isActive true so appears on Home
      const toiletPayload = {
        name: `E2E Active ${Date.now()}`,
        location: { lat: 37.98, lng: 23.72 },
        description: 'Active toilet for e2e',
        amenities: ['soap'],
        photos: [],
      };
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL') || 'http://localhost:4000'}/api/toilets`,
        headers: { Authorization: `Bearer ${token}` },
        body: toiletPayload
      }).then(r => ({ token, toilet: r.body.data }));
    }).then(({ token, toilet }) => {
      // mark toilet active if backend returned not-active (mock mode returns isActive:false)
      // If mock mode, update toilet mock via API (we have no API for approve in tests), 
      // so we navigate directly to details assuming accessible or find by name on home.
      // For safety we will visit details using returned toiletId:
      const id = toilet.toiletId || toilet.toiletId;
      // If toilet isn't active and Home won't show it, visit details directly:
      cy.visit(`/toilet/${id}`);

      // wait for toilet details to load and then submit review
      cy.get('h1').should('contain', toilet.name);

      // pick ratings - we click first star for each rating
      cy.get('form').within(() => {
        cy.get('span').contains('★').first().click(); // overall
        // assume StarRating repeats stars for each category - better to target labels
      });

      // To be deterministic, set values via intercept to the API if UI structure differs.
      // For simplicity, fill comment and click submit (this relies on UI StarRating clicks above)
      cy.get('textarea[placeholder="Write your comment..."]').type('Great toilet!');
      cy.get('button').contains('Submit Review').click();

      // success: reload and find comment in reviews list
      cy.contains('Great toilet!', {timeout: 10000}).should('exist');
    });
  });
});
