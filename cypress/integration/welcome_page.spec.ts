/// <reference types="cypress" />

describe('Welcome Page', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000');
    });

    it('has a login button', () => {
        cy.findByText('Login', { timeout: 7500 }).should('exist');
    });
});
