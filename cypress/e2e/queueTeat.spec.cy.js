import { input, circle, CircleBorder, addButton, deleteButton, cleanButton} from "../support/constants"

describe('stack test', () => {
    beforeEach(() => {
        cy.visit('/queue')
    })

    it('disables add button when input is empty', () => {
        cy.get(input).should('have.value', '');
        cy.get(addButton).should('be.disabled');
      });
    
      it('correctly adds an element to the queue', () => {
        cy.get(input).type('A');
        cy.get(addButton).contains('Добавить').click();
        cy.get(circle).eq(0).should('contain', 'A').and('have.css', 'border', CircleBorder.Changing)
        cy.get(circle).eq(0) 
          .siblings()
          .contains('Tail');
        cy.get(circle).eq(0)
          .siblings()
          .contains('Head'); 
        
          cy.wait(500)

        cy.get(circle).eq(0).should('contain', 'A').and('have.css', 'border', CircleBorder.Default)
        cy.get(input).type('B');
        cy.get(addButton).contains('Добавить').click();
        cy.get(circle).eq(0).should('contain', 'A').and('have.css', 'border', CircleBorder.Default)
        cy.get(circle).eq(0)
          .siblings()
          .contains('Head');
        cy.get(circle).eq(1).should('contain', 'B').and('have.css', 'border', CircleBorder.Changing)
        cy.get(circle).eq(1) 
          .siblings()
          .contains('Tail');

          cy.wait(500)

          cy.get(circle).eq(1).should('contain', 'B').and('have.css', 'border', CircleBorder.Default)
      });
    
      it('correctly removes an element from the queue', () => {
        cy.get(input).type('A');
        cy.get(addButton).contains('Добавить').click();

        cy.wait(500)

        cy.get(input).type('B');
        cy.get(addButton).contains('Добавить').click();

        cy.wait(500)

        cy.get(circle).eq(0).should('contain', 'A')
        cy.get(deleteButton).contains('Удалить').click();

        cy.wait(500)

        cy.get(circle).eq(0).should('not.have.text')
        cy.get(circle).eq(1).should('contain', 'B')
        cy.get(circle).eq(1) 
          .siblings()
          .contains('Tail');
        cy.get(circle).eq(1)
          .siblings()
          .contains('Head');
      });
    
      it('clears the queue', () => {
        cy.get(input).type('A');
        cy.get(addButton).contains('Добавить').click();

        cy.wait(500)

        cy.get(input).type('B');
        cy.get(addButton).contains('Добавить').click();

        cy.wait(500)


        cy.get('button').contains('Очистить').click();

         cy.get(circle).each(($el) => {
          cy.wrap($el).should('not.have.text');
        });
        cy.get(circle).each(($el) => {
          cy.wrap($el)
            .siblings()
            .should('not.contain', 'Tail');
        });
        cy.get(circle).each(($el) => {
          cy.wrap($el)
            .siblings()
            .should('not.contain', 'Head');
        });
      });
    });