import { input, addToTail ,deleteFromHead,deleteFromTail, addByIndex, deleteByIndex, addButton, addTohead, indexInput, circle } from "../support/constants";

describe('list Test', () => {
    beforeEach(() => {
        cy.visit('/list')
    })

    it('disables add button when input is empty', () => {
        cy.get(input).should('have.value', '');
        cy.get(indexInput).should('have.value', '')
        cy.get(addTohead).should('be.disabled');
        cy.get(addToTail).should('be.disabled');
        cy.get(addByIndex).should('be.disabled');
        cy.get(deleteByIndex).should('be.disabled')
      });
      
      it('renders circles initially', () => {
        cy.get(circle).should('have.length', 5);
      });

      it('correctly add to head', () => {
        cy.get(input).type('TEST')
        cy.get(addTohead).click()
        cy.get(circle).eq(0).should('contain', 'TEST')
      })

      it('correctly add to tail', () => {
        cy.get(input).type('TEST')
        cy.get(addToTail).click()
        cy.get(circle).last().should('contain', 'TEST')
      })

      it('correctly delete from head', () => {
        cy.get(input).type('TEST')
        cy.get(addTohead).click()
        cy.get(circle).eq(0).should('contain', 'TEST')
        cy.get(deleteFromHead).click()
        cy.get(circle).eq(0).should('not.contain', 'TEST')
      })

      it('correctly delete from tail', () => {
        cy.get(input).type('TEST')
        cy.get(addToTail).click()
        cy.get(circle).last().should('contain', 'TEST')
        cy.get(deleteFromTail).click()
        cy.get(circle).last().should('not.contain', 'TEST')
      })

      it('correctly add by index', () => {
        cy.get(input).type('TEST')
        cy.get(indexInput).type('2')
        cy.get(addByIndex).click()
        cy.get(circle).eq(2).should('contain', 'TEST')
      })

      it('correctly delete by index', () => {
        cy.get(input).type('TEST')
        cy.get(indexInput).type('2')
        cy.get(addByIndex).click()
        cy.get(circle).eq(2).should('contain', 'TEST')
        cy.wait(1500)
        cy.get(indexInput).type('2')
        cy.get(deleteByIndex).click()
        cy.get(circle).eq(2).should('not.contain', 'TEST')
      })
    });