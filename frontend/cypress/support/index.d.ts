/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = string> {
    goToHomePage(): Chainable<Element>;
    login(): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}
