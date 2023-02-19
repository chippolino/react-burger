import { initialState, orderDetailsReducer } from './order-details'
import { SEND_CHECKOUT_FAILED, SEND_CHECKOUT_REQUEST, SEND_CHECKOUT_SUCCESS } from '../actions/order-details'
import { order } from '../../utils/mock'

describe('Order details reducer', () => {
  it('Проверка начального состояния', () => {
    const result = orderDetailsReducer(initialState, {})
    expect(result).toEqual(initialState)
  })
  it('Запрос данных отправки заказа', () => {
    const result = orderDetailsReducer(initialState, { type: SEND_CHECKOUT_REQUEST })
    expect(result).toEqual({ ...initialState, orderDetailsRequest: true })
  })
  it('Успешный запрос отправки заказа', () => {
    const result = orderDetailsReducer(initialState, { type: SEND_CHECKOUT_SUCCESS, payload: order })
    expect(result).toEqual({
      ...initialState,
      orderDetailsRequest: false,
      orderDetailsFailed: false,
      orderDetails: order
    })
  })
  it('Ошибка запроса отправки заказа', () => {
    const result = orderDetailsReducer(initialState, { type: SEND_CHECKOUT_FAILED })
    expect(result).toEqual({
      ...initialState,
      orderDetailsFailed: true,
      orderDetailsRequest: false
    })
  })
})
