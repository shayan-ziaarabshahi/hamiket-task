/* eslint-disable no-undef */
/// <reference types="cypress" />


describe("someDescription", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
 
    it('level 1 tasks working', () => {
        cy.get("#1").click()
        cy.get("#3").should('be.visible')
    });

    it('level 2 tasks working', () => {
        cy.get("#1").click()
        cy.get("#3").click()
        cy.get("#2").should('be.visible')
        cy.get("#4").should('be.visible')
        cy.get("#5").should('be.visible')
    });
    
    it('level 3 tasks working', () => {
        cy.get("#1").click()
        cy.get("#3").click()
        cy.get("#5").click()
        cy.get("#7").should('be.visible')
    });
 
 })