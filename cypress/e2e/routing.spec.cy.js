describe('Routing is working correctly', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.wait(500);
      });

    it('routing to string page is OK', () => {
        cy.visit('/recursion')
        cy.contains('Строка')
    })

    it('routing to fibanachi page is OK', () => {
        cy.visit('/fibonacci')
        cy.contains('Последовательность Фибоначчи')
    })

    it('routing to shotring page is OK', () => {
        cy.visit('/sorting')
        cy.contains('Сортировка массива')
    })
    
    it('routing to stack page is OK', () => {
        cy.visit('/stack')
        cy.contains('Стек')
    })

    it('routing to queue page is OK', () => {
        cy.visit('/queue')
        cy.contains('Очередь')
    })

    it('routing to list page is OK', () => {
        cy.visit('/list')
        cy.contains('Связный список')
    })
})