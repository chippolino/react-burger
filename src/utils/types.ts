import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {
  TWsActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_USER_START,
  WS_GET_ALL_ORDERS
} from '../services/actions/ws-actions'
import { store } from '../services/store'
import { TBurgerConstructorActions } from '../services/actions/burger-constructor'
import { TMenuActions } from '../services/actions/ingredients'
import { TSendCheckoutActions } from '../services/actions/order-details'
import { TUserActions } from '../services/actions/user'

export type TIngredientPropTypes = {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
  uniqueId?: string
  title?: string
}

export interface IFormDataTypes {
  readonly email?: string
  readonly name?: string
  readonly password?: string
  readonly token?: string
}

export interface IUserTypes {
  readonly user?: { name: string; email: string }
  readonly email?: string
  readonly name?: string
  readonly token?: string
}

export type TWsMiddlewareActions = {
  wsInit: typeof WS_CONNECTION_START
  wsUserInit: typeof WS_CONNECTION_USER_START
  onOpen: typeof WS_CONNECTION_SUCCESS
  onClose: typeof WS_CONNECTION_CLOSED
  onError: typeof WS_CONNECTION_ERROR
  onMessage: typeof WS_GET_ALL_ORDERS
}

export type TApplicationActions =
  | TBurgerConstructorActions
  | TMenuActions
  | TSendCheckoutActions
  | TUserActions
  | TWsActions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>
export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TApplicationActions>
