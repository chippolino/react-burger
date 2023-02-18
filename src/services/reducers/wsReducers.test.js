import { initialState, wsReducer } from './wsReducer'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS
} from '../actions/ws-actions'
import { ordersSocket } from '../../utils/mock'

describe('wsReducer reducer', () => {
  it('Проверка начального состояния', () => {
    const result = wsReducer(initialState, {})
    expect(result).toEqual(initialState)
  })
  it('Успешное подключение сокета', () => {
    const result = wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })
    expect(result).toEqual({ ...initialState, wsConnected: true })
  })
  it('Ошибка подключения сокета', () => {
    const result = wsReducer(initialState, { type: WS_CONNECTION_ERROR })
    expect(result).toEqual({ ...initialState, wsConnected: false })
  })
  it('Соединение закрыто', () => {
    const result = wsReducer(initialState, { type: WS_CONNECTION_CLOSED })
    expect(result).toEqual({ ...initialState, wsConnected: false })
  })
  it('Получение списка всех заказов', () => {
    const result = wsReducer(initialState, { type: WS_GET_ALL_ORDERS, payload: ordersSocket })
    expect(result).toEqual({ ...initialState, data: ordersSocket })
  })
})
