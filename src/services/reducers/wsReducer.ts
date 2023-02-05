import {
  TWsActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS
} from '../actions/ws-actions'
import { TOrder, TOrders } from '../types/data'

type TWsState = {
  wsConnected: boolean
  data: TOrders<TOrder> | null
}

export const initialState: TWsState = {
  wsConnected: false,
  data: null
}

export const wsReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      }

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      }

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      }

    case WS_GET_ALL_ORDERS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}
