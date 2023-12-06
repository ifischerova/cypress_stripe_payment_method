describe('Test payment with card.', () => {
    beforeEach(() => {
      cy.getToMainPage()
      cy.getToCartPage()
    })

    it('Proceed payment with valid card.', () => {
      cy.origin('https://checkout.stripe.com', () => {
        Cypress.require("../support/commands.js")

        cy.get(".CheckoutPaymentForm").should("be.visible")
        cy.get('.SubmitButton-Text--current').contains('Pay')
        cy.get('.SubmitButton').should('have.class','SubmitButton--incomplete')

        cy.fillEmailAddress('test@email.com')
        cy.fillCardNumber('4000 0582 6000 0005')
        cy.fillCardExpiry({
          expiry: '0525',
          expiryFormValue:'05 / 25'
        })
        cy.fillCardCvc(852)
        cy.fillCardBillingName('Perníček Medový')

        cy.get('.SubmitButton').should('have.class','SubmitButton--complete').click()
        cy.get('.SubmitButton-Text--current').contains('Processing...')
      })

      cy.origin('http://localhost:4242', () => {
        cy
          .url({timeout: 20000 }).should('include', '/success.html')
          .get('#customer-info').contains('Děkujeme za Váš nákup nejlepších perníčků v celém vesmiru.')
      }) 
    })

    it('Try to pay with invalid card.', () => {
      cy.origin('https://checkout.stripe.com', () => {
        Cypress.require("../support/commands.js")

        cy.get('.SubmitButton-Text--current').contains('Pay')
        cy.get('.SubmitButton').should('have.class','SubmitButton--incomplete')

        cy.get('form').submit()

        cy.get('[data-qa="EmptyFieldError"]') 
          .each((errorMsg) => {
            cy.wrap(errorMsg).should('be.visible'); 
          })
          .its('length').should('gte',1)

        cy.fillEmailAddress('testemail.co')
        cy.get('#email').should('have.class','CheckoutInput--invalid')
        cy.get('.FieldError > span').should('be.visible').contains('Your email is incomplete.')

        cy.fillCardExpiry({
          expiry: '0521',
          expiryFormValue:'05 / 21'
        })
        cy.get('#cardExpiry').should('have.class','CheckoutInput--invalid')
        cy.get('.FieldError > span').should('be.visible').contains("Your card's expiration year is in the past.")

        cy.fillCardNumber('4000 0000 0000 0005')
        cy.get('#cardNumber').should('have.class','CheckoutInput--invalid')
        cy.get('.FieldError > span').should('be.visible').contains('Your card number is invalid.')

        cy.get('.SubmitButton-Text--current').contains('Pay')
        cy.get('.SubmitButton').should('have.class','SubmitButton--incomplete')
      })
    })
})