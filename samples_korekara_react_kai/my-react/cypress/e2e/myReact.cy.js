describe('Cypress Sample', () => {
  it('MyReact App Test', () => {
    cy.visit('/');
    // cy.visit('/', { method: 'GET' });

    cy.get('#name').clear().type('じゅげむじゅげむごこうのすりきれかいじゃりすいぎょ');
    cy.get('#email').clear().type('メールアドレス');
    cy.get('[type="submit"]').click();
    cy.get('div.error').should('contain', '名前は20文字以内');
    cy.get('div.error').should('contain', 'メールアドレスの形式が不正');
    cy.get('div.error').should('contain', '備考は必須入力');
    cy.get('#name').should('have.focus');

    cy.get('#name').clear().type('樋口理央');
    cy.get('#male').check();
    cy.get('#email').clear().type('rhiguchi@example.com');
    cy.get('#memo').type('連絡はメールでお願いします。');
    cy.get('[type="submit"]').click();
    cy.get('div.error').should('be.empty');
  });
});
