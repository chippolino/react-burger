import { ingredient } from '../../utils/mock'
import { burgerConstructorReducer, initialState } from './burger-constructor'
import { ADD_INGREDIENT, DRAGGED_MOVE, REMOVE_INGREDIENT } from '../actions/burger-constructor'

describe('Burger constructor reducer', () => {
  it('Проверка начального состояния', () => {
    const result = burgerConstructorReducer(initialState, {})
    expect(result).toEqual(initialState)
  })
  it('Добавить ингредиент', () => {
    const result = burgerConstructorReducer(
      { ...initialState, bun: ingredient, items: [ingredient] },
      { type: ADD_INGREDIENT, ingredient: ingredient, uniqueId: ingredient.uniqueId }
    )
    expect(result).toEqual({ ...initialState, bun: ingredient, items: [ingredient, ingredient] })
  })
  it('Удалить ингредиент', () => {
    const result = burgerConstructorReducer(
      { ...initialState, items: [ingredient] },
      { type: REMOVE_INGREDIENT, payload: ingredient.uniqueId }
    )
    expect(result).toEqual({ ...initialState, items: [] })
  })
  it('Перетащить ингредиент', () => {
    const result = burgerConstructorReducer(
      { ...initialState, items: [ingredient] },
      { type: DRAGGED_MOVE, currentItem: { ingredient }, overIndex: ingredient.uniqueId }
    )
    expect(result).toEqual({ ...initialState, items: [ingredient] })
  })
})
