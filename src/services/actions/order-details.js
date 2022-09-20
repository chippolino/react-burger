import { makeOrder } from '../../utils/burger-api'
import { checkResponse } from '../../utils/check-response'

export const SEND_CHECKOUT_REQUEST = 'SEND_CHECKOUT_REQUEST'
export const SEND_CHECKOUT_SUCCESS = 'SEND_CHECKOUT_SUCCESS'
export const SEND_CHECKOUT_FAILED = 'SEND_CHECKOUT_FAILED'

export const sendOrder = () => {
  return function (dispatch, getState) {
    const state = getState()

    function createOrder(state) {
      if (
        Object.keys(state.burgerConstructor.cart.bun).length > 0 ||
        state.burgerConstructor.cart.items.length > 0
      ) {
        return [
          state.burgerConstructor.cart.bun._id,
          ...state.burgerConstructor.cart.items.map((i) => i._id),
          state.burgerConstructor.cart.bun._id
        ]
      }
      return null
    }

    dispatch({
      type: SEND_CHECKOUT_REQUEST
    })
    makeOrder(createOrder(state))
      .then(checkResponse)
      .then((res) => {
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
