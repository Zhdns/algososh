import { submitButton, input, circle,  CircleBorder} from "../support/constants"

describe('string test', () => {
    beforeEach(() => {
        cy.visit('/recursion')
    })

    it('button is lock when input is empty', () => {
        cy.get(submitButton).as('btn')
        cy.get(input).should('have.value', '')
        cy.get('@btn').should('be.disabled');
    })

    it('correctly animates the string reversal', () => {
      const expectedOrder = 'dcba'.split('');

      cy.get('input[data-testid="value"]').type('abcd');
      cy.get('button[data-testid="submit"]').click();
  
      cy.get(circle).eq(0).should('have.css', 'border', CircleBorder.Changing); 
      cy.get(circle).eq(3).should('have.css', 'border', CircleBorder.Changing); 
  
      cy.wait(500);
  
      cy.get(circle).eq(0).should('have.css', 'border', CircleBorder.Modified); 
      cy.get(circle).eq(3).should('have.css', 'border', CircleBorder.Modified); 
  
      cy.wait(500);

      cy.get(circle).eq(1).should('have.css', 'border', CircleBorder.Changing);
      cy.get(circle).eq(2).should('have.css', 'border', CircleBorder.Changing); 
  
      cy.wait(500);
  
      cy.get(circle).eq(1).should('have.css', 'border', CircleBorder.Modified); 
      cy.get(circle).eq(2).should('have.css', 'border', CircleBorder.Modified); 
  
      cy.wait(500);
  
      cy.get(circle).each(($el, index) => {
        cy.wrap($el).should('have.css', 'border', CircleBorder.Modified); 
        cy.wrap($el).invoke('text').should('eq', expectedOrder[index])
      });
    });
})  