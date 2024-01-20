describe('`Servers availability:', () => {
    it('app starts correctly', () => {
      cy.visit('/');
      cy.contains('МБОУ АЛГОСОШ');
      cy.contains('Сделано в Практикуме.')
    });
  });