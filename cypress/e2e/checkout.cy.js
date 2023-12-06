describe('Test failure when Stripe API is unavailable.', () => {
    beforeEach(() => {
        cy.getToMainPage()
    })

    it("On server error user is redirected to an error page", () => {
        cy.intercept('/create-checkout-session', {
            statusCode: 303,
            headers: {
                location: '/error.html'
            },
        })

        cy.get('#checkout-button').click()
        cy.contains("Ooops")
    })
})