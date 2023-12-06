// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getToMainPage', () => {
    cy
    .visit('http://127.0.0.1:4242/checkout.html')
    .get('h1').contains('Nejlepší perníčky v celém vesmíru!').should('be.visible')
})

Cypress.Commands.add('getToCartPage', () => {
    cy.origin('https://checkout.stripe.com', () => {

    cy.on('uncaught:exception', (e) => {
      // Handle errors from Sripe's JS - could be caused by Cypress interference
      return false
    })
  })
  
    cy.get('form').submit()
})


Cypress.Commands.add('fillEmailAddress', (email) => {
    cy
    .get(".CheckoutInput[name='email']").should('be.empty')
    .type(`${email}{enter}`)
    .should('have.value', email)
})

Cypress.Commands.add('fillCardNumber', (cardnumber) => {
    cy
    .get('#cardNumber').should('be.empty')
    .type(`${cardnumber}{enter}`)
    .should('have.value', cardnumber)
})

Cypress.Commands.add('fillCardExpiry', (card) => {
    cy
    .get('#cardExpiry').should('be.empty')
    .type(`${card.expiry}{enter}`)
    .should('have.value', card.expiryFormValue)
})

Cypress.Commands.add('fillCardCvc', (cvc) => {
    cy
    .get('#cardCvc').should('be.empty')
    .type(`${cvc}{enter}`)
    .should('have.value', cvc)
})

Cypress.Commands.add('fillCardBillingName', (holder) => {
    cy
    .get('#billingName').should('be.empty')
    .type(holder)
    .should('have.value', holder)
})







