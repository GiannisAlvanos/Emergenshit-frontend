// custom commands: login via API, create toilet via API
Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL') || 'http://localhost:4000'}/api/auth/login`,
    body: { email, password },
    failOnStatusCode: false
  }).then((res) => {
    // res.body.data.token or res.body.token depends on backend
    const token = res.body?.data?.token || res.body?.token || res.body?.token;
    if (token) {
      window.localStorage.setItem('token', token);
      // optionally set user info if API returns it:
      const user = res.body?.data?.user || res.body?.user;
      if (user) window.localStorage.setItem('user', JSON.stringify(user));
    }
    return res;
  });
});

Cypress.Commands.add('apiCreateToilet', (token, toiletPayload) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL') || 'http://localhost:4000'}/api/toilets`,
    body: toiletPayload,
    headers: { Authorization: `Bearer ${token}` },
  });
});
