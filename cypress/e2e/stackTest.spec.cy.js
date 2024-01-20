import { input, circle, CircleBorder, addButton, deleteButton, cleanButton} from "../support/constants"

describe('stack test', () => {
    beforeEach(() => {
        cy.visit('/stack')
    })

    it('button is lock when input is empty', () => {
        cy.get(input).should('have.value', '')
        cy.get(addButton).should('be.disabled');
    })
    
    it('adds an element to the stack', () => {
        cy.get(input).type('A');
        cy.get(addButton).contains('Добавить').click();
        cy.get(circle).should('have.length', 1).and('contain', 'A').and('have.css', 'border', CircleBorder.Changing)
        cy.wait(500)
        cy.get(circle).should('have.css', 'border', CircleBorder.Default)
        
      });
    
    it('removes an element from the stack', () => {
        const elementsToAdd = ['A', 'B', 'C'];
        elementsToAdd.forEach(element => {
            cy.get(input).type(element);
            cy.get(addButton).click();
            cy.wait(500); 
        });

        cy.get(deleteButton).click();
        cy.wait(500); 

        cy.get(circle).should('have.length', 2);
        cy.get(circle).eq(0).should('contain', 'A');
        cy.get(circle).eq(1).should('contain', 'B');
      });
    
    it('clears the stack', () => {
        cy.get(input).type('A')
        cy.get(addButton).contains('Добавить').click();
        cy.wait(500)
        cy.get(cleanButton).contains('Очистить').click();
        cy.get(circle).should('have.length', 0);
      });
    });