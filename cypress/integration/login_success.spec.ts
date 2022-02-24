/// <reference types="cypress" />

context('User Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('successfully logs in given corret login info', () => {
        // https://on.cypress.io/intercept

        // Intercept - can be used for future spying
        cy.intercept('POST', '**/auth/sign_in*').as('postLoginResponse');

        // we have code that enters login info
        cy.findByLabelText('Email', { timeout: 7500 })
            .type('potato@potato.com')
            .should('have.value', 'potato@potato.com');

        cy.findByLabelText('Password', { timeout: 7500 })
            .type('asdfasdf')
            .should('have.value', 'asdfasdf');

        // we have code that clicks the login button
        cy.get('button[type=submit]')
            .findByText('Log In', { timeout: 7500 })
            .click();

        // https://on.cypress.io/wait
        // our request is successful since we used correct user info
        cy.wait('@postLoginResponse')
            .its('response.statusCode')
            .should('be.oneOf', [200]);

        // we go to the dashboard page
        cy.location('pathname').should('include', '/dashboard');
    });
});
