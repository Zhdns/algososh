import { submitButton, input, circle} from "../support/constants"

describe('fibonachi test', () => {
    beforeEach(() => {
        cy.visit('/fibonacci')
    })

    it('button is lock when input is empty', () => {
        cy.get(submitButton).as('btn')
        cy.get(input).should('have.value', '')
        cy.get('@btn').should('be.disabled');
    })

    it('correctly generates the Fibonacci sequence', () => {
        cy.get('input[data-testid="value"]').type('5');
        cy.get('button[data-testid="submit"]').click();
    
        const expectedSequence = [1, 1, 2, 3, 5, 8];
        expectedSequence.forEach((num, index) => {
          cy.get(circle).eq(index).should('contain', num.toString());
        });
      });
})