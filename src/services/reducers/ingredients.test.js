import { ingredientsReducer, initialState } from './ingredients'
import { ingredient, ingredients } from '../../utils/mock'
import { GET_MENU_FAILED, GET_MENU_REQUEST, GET_MENU_SUCCESS } from '../actions/ingredients'

const state = { ...initialState, menu: [ingredient] }
describe('Ingredients reducer', () => {
  it('Проверка начального состояния', () => {
    const result = ingredientsReducer(state, {})
    expect(result).toEqual(state)
  })
  it('Запрос ингридиентов', () => {
    const result = ingredientsReducer(initialState, { type: GET_MENU_REQUEST })
    expect(result).toEqual({ ...initialState, menuRequest: true })
  })
  it('Успешный запрос ингридиентов', () => {
    const result = ingredientsReducer(initialState, { type: GET_MENU_SUCCESS, payload: ingredients })
    expect(result).toEqual({ ...initialState, menu: ingredients, menuRequest: false, menuFailed: false })
  })
  it('Ошибка запроса ингредиентов', () => {
    const result = ingredientsReducer(initialState, { type: GET_MENU_FAILED })
    expect(result).toEqual({ ...initialState, menuFailed: true, menuRequest: false })
  })
})
