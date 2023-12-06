const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
    // Enable custom commands inside cy.origin
    // https://github.com/testing-library/cypress-testing-library/issues/221
    experimentalOriginDependencies: true
  },

  // Stripe Checkout Tests break out because of the iframe
  // https://github.com/cypress-io/cypress/issues/9447
  experimentalModifyObstructiveThirdPartyCode: true,
});
