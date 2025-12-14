import './commands';

// increase default timeout if CI is slow
Cypress.config('defaultCommandTimeout', 8000);
