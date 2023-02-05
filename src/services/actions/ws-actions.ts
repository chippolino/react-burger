import { TOrder, TOrders } from '../types/data'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_CONNECTION_USER_START: 'WS_CONNECTION_USER_START' = 'WS_CONNECTION_USER_START'
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED'
export const WS_GET_ALL_ORDERS: 'WS_GET_ALL_ORDERS' = 'WS_GET_ALL_ORDERS'

export interface wsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
  readonly payload: string
}
export interface wsConnectionUserStart {
  readonly type: typeof WS_CONNECTION_USER_START
  readonly payload: string
}

export interface wsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface wsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}

export interface wsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface wsGetAllOrders {
  readonly type: typeof WS_GET_ALL_ORDERS
  readonly payload: TOrders<TOrder>
}

export const WsConnectionStart = (): wsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: '/all'
})

export const WsConnectionUserStart = (): wsConnectionUserStart => ({
  type: WS_CONNECTION_USER_START,
  payload: ''
})

export const WsConnectionClose = (): wsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED
})

export type TWsActions =
  | wsConnectionStart
  | wsConnectionUserStart
  | wsConnectionSuccess
  | wsConnectionError
  | wsConnectionClosed
  | wsGetAllOrders
