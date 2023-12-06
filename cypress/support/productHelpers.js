export const checkOfferredProduct = (productNameSelector, priceSelector, product, price) => {
    cy.get(productNameSelector).should('be.visible')
       .should('have.text', product)
    cy.get(priceSelector).should('be.visible')
      .should('have.text', price)
}
