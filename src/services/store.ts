import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import { socketMiddleware } from './middlewares/socket-middleware'
import { BASE_URL_ORDERS } from '../utils/burger-api'
import { TWsMiddlewareActions } from '../utils/types'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_USER_START,
  WS_GET_ALL_ORDERS
} from './actions/ws-actions'

const wsActions: TWsMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsUserInit: WS_CONNECTION_USER_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ALL_ORDERS
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(BASE_URL_ORDERS, wsActions)))

export const store = createStore(rootReducer, enhancer)
