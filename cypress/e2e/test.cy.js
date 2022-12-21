///<reference types="cypress" />

describe('test login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
      })

    it('user can see login form', () => {
        cy.contains('Login')
        cy.contains('Your Email')
        cy.contains('Your Password')
        cy.get('#btnLogin').should('be.visible')
    })

    it('user can input email', () => {
        cy.get('#email').type('181@gmail.com')
        cy.get('#password').type('pass1234')
    })

    it('user can input password', () => {
        cy.get('#email').type('181@gmail.com')
        cy.get('#password').type('pass1234')
    })

    it('user can login', () => {
        cy.get('#email').type('181@gmail.com')
        cy.get('#password').type('pass1234')
        cy.get('#btnLogin').click()
        cy.intercept(
            {
              method: 'POST',
              url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k', 
            },
            []
          ).as('authenticateUser') 
        cy.intercept(
            {
              method: 'GET',
              url: '/auth/login/181@gmail.com', 
            },
            {
                "role": "STUDENT",
                "ID": "1"
            }
          ).as('getUsers') 
          cy.intercept(
            {
              method: 'POST', 
              url: '/auth/validate',
            },
            []
          ).as('validate')
          cy.url().should('eq', 'http://localhost:3000/student/home')
    })
    it('user can logout', () => {
        cy.get('#email').type('181@gmail.com')
        cy.get('#password').type('pass1234')
        cy.get('#btnLogin').click()
        cy.intercept(
            {
              method: 'POST',
              url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k', 
            },
            []
          ).as('authenticateUser') 
        cy.intercept(
            {
              method: 'GET',
              url: '/auth/login/181@gmail.com', 
            },
            {
                "role": "STUDENT",
                "ID": "1"
            }
          ).as('getUsers') 
          cy.intercept(
            {
              method: 'POST', 
              url: '/auth/validate',
            },
            []
          ).as('validate')
          cy.get('nav').should('be.visible') 
          cy.url().should('eq', 'http://localhost:3000/student/home')
          cy.get('#btnLogout').should('be.visible').click()
          cy.url().should('eq', 'http://localhost:3000/')
    })
})