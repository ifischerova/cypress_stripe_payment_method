const utils = require("../support/productHelpers")

describe('Test content and interaction with the UI.', () => {
    beforeEach(() => {
        cy.getToMainPage()
      })

    it("Main page offers proper product(img, price, name)", () => {
        const productNameSelector = "#product-name"
        const priceSelector = "#amount"

        utils.checkOfferredProduct(productNameSelector, priceSelector,  'Sada pernicku Vesmir',  '500');

        cy.get('#checkout-button').should('be.visible').contains('Koupit')
        cy.get("#ginger-img")
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0)
    })
})