// Creating aliases for Web Components

describe('SignUp Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // get shawodow DOM elements
    cy.get('provet-input').shadow().find('input[name="email"]').as('emailInput')
    cy.get('provet-input').shadow().find('input[name="password"]').as('passwordInput')
    cy.get('provet-checkbox')
      .shadow()
      .find('input[name="allowCommunication"]')
      .as('allowCommCheckbox')
    cy.get('provet-button[id="toggle-password"]').as('togglePassword')
    cy.get('provet-button').shadow().find('button[name="submit"]').as('submitButton')
  })

  it('allows a user to type into the email, password, and interact with the checkbox', () => {
    cy.get('@emailInput').should('exist')
    cy.get('@emailInput').clear()
    cy.get('@emailInput').type('testuser@example.com')
    cy.get('@emailInput').should('have.value', 'testuser@example.com')

    cy.get('@passwordInput').should('exist')
    cy.get('@passwordInput').clear()
    cy.get('@passwordInput').type('123')
    cy.get('@passwordInput').should('have.value', '123')

    cy.get('@togglePassword').click()
    cy.get('@allowCommCheckbox').check()
  })

  it('shows error messages after form submit if required fields are missing', () => {
    // (Optional) You can also set up the form state here (or rely on the actions in the previous test).
    // In this example, we simulate an invalid form submission:
    cy.get('@emailInput').clear()
    cy.get('@passwordInput').clear()

    // Submit the form.
    cy.get('@submitButton').click()

    // Assert that the error messages are shown.
    // Adjust these error messages to match those from your SignUp.vue validation logic.
    cy.contains('Email cannot be empty').should('be.visible')
    cy.contains('Password cannot be empty').should('be.visible')
  })

  it('shows error messages from the server', () => {
    // (Optional) You can also set up the form state here (or rely on the actions in the previous test).
    // In this example, we simulate an invalid form submission:
    cy.get('@emailInput').clear()
    cy.get('@emailInput').type('testuser@example.com')
    cy.get('@passwordInput').clear()
    cy.get('@passwordInput').type('123')

    // Submit the form.
    cy.get('@submitButton').click()

    // Assert that the error messages are shown.
    // Adjust these error messages to match those from your SignUp.vue validation logic.
    cy.contains('We’re experiencing an incident').should('be.visible')
  })

  it('shows succes page after form submit', () => {
    // (Optional) You can also set up the form state here (or rely on the actions in the previous test).
    // In this example, we simulate an invalid form submission:
    cy.get('@emailInput').clear()
    cy.get('@emailInput').type('testuser@example.com')
    cy.get('@passwordInput').clear()
    cy.get('@passwordInput').type('abc')

    // Submit the form.
    cy.get('@submitButton').click()

    // Assert that the error messages are shown.
    // Adjust these error messages to match those from your SignUp.vue validation logic.
    cy.contains('Your registration was successful').should('be.visible')
  })
})
