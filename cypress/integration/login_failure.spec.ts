/// <reference types="cypress" />

context('Network Requests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('fails to log in given incorrect login info', () => {
        // https://on.cypress.io/intercept

        // Intercept - can be used for future spying
        cy.intercept('POST', '**/auth/sign_in*').as('postLoginResponse');

        // we have code that enters login info
        cy.findByLabelText('Email', { timeout: 7500 })
            .type('tomato@tomato.com')
            .should('have.value', 'tomato@tomato.com');

        cy.findByLabelText('Password', { timeout: 7500 })
            .type('asdfasdf')
            .should('have.value', 'asdfasdf');

        // we have code that clicks the login button
        cy.get('button[type=submit]')
            .findByText('Log In', { timeout: 7500 })
            .click();

        // https://on.cypress.io/wait
        cy.wait('@postLoginResponse')
            .its('response.statusCode')
            .should('be.oneOf', [401]);

        // we don't navigate anywhere given incorrect login info
        cy.location('pathname').should('include', '/login');
    });
});
