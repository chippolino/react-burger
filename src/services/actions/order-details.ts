import { makeOrder } from '../../utils/burger-api'
import { checkResponse } from '../../utils/check-response'
import { AppDispatch, TIngredientPropTypes } from '../../utils/types'

export const SEND_CHECKOUT_REQUEST: 'SEND_CHECKOUT_REQUEST' = 'SEND_CHECKOUT_REQUEST'
export const SEND_CHECKOUT_SUCCESS: 'SEND_CHECKOUT_SUCCESS' = 'SEND_CHECKOUT_SUCCESS'
export const SEND_CHECKOUT_FAILED: 'SEND_CHECKOUT_FAILED' = 'SEND_CHECKOUT_FAILED'

export interface ISendCheckoutRequest {
  readonly type: typeof SEND_CHECKOUT_REQUEST
}

export interface ISendCheckoutSuccess {
  readonly type: typeof SEND_CHECKOUT_SUCCESS
  readonly payload: string
}

export interface ISendCheckoutFailed {
  readonly type: typeof SEND_CHECKOUT_FAILED
  readonly error: string
}

export type TSendCheckoutActions = ISendCheckoutSuccess | ISendCheckoutRequest | ISendCheckoutFailed

export const sendOrder = (array: TIngredientPropTypes[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_CHECKOUT_REQUEST
    })

    makeOrder(array)
      .then(checkResponse)
      .then((res: any) => {
        dispatch({
          type: SEND_CHECKOUT_SUCCESS,
          payload: res
        })
      })
      .catch((error) => {
        dispatch({
          type: SEND_CHECKOUT_FAILED,
          error
        })
      })
  }
}
