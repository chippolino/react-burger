describe('Создание заказа', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Перетаскивание булки', () => {
    cy.viewport(1920, 1080)
    cy.get('[data-cy-test=ingredient]').first().contains('булка').trigger('dragstart')
    cy.get('[data-cy-test=ingredient-in-constructor]').trigger('drop')
  })

  it('Перетаскивание ингредиента', () => {
    cy.viewport(1920, 1080)
    cy.get('[data-cy-test=ingredient]').contains('Соус').trigger('dragstart')
    cy.get('[data-cy-test=ingredient-in-constructor]').trigger('drop')

    cy.get('[data-cy-test=ingredient]').contains('Филе').trigger('dragstart')
    cy.get('[data-cy-test=ingredient-in-constructor]').trigger('drop')

    cy.get('[data-cy-test=ingredient]').contains('Биокотлета').trigger('dragstart')
    cy.get('[data-cy-test=ingredient-in-constructor]').trigger('drop')
  })

  it('Создание заказа', () => {
    cy.viewport(1920, 1080)
    cy.get('[data-cy-test=ingredient]').first().contains('булка').trigger('dragstart')
    cy.get('[data-cy-test=ingredient-in-constructor]').trigger('drop')
    cy.get('[data-cy-test=ingredient]').contains('Соус').trigger('dragstart')
    cy.get('[data-cy-test=ingredient-in-constructor]').trigger('drop')

    cy.get('button').contains('Оформить заказ').click()
  })

  it('Авторизация', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/#/login')
    cy.get('[name=email]').focus().type('test292292@ya.ru')
    cy.get('[name=password]').focus().type('12345678')
    cy.get('button').contains('Войти').click()
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login')
  })

  it('Модальные окна открываются', () => {
    cy.viewport(1920, 1080)
    cy.get('[data-cy-test=ingredient]').contains('Соус').click()
    cy.get('[class^=modal-overlay_overlay__]')
  })

  it('Модальные окна закрываются', () => {
    cy.viewport(1920, 1080)
    cy.get('[data-cy-test=ingredient]').contains('Соус').click()
    cy.get('[class^=modal_closeButton__]').click()
  })
})
