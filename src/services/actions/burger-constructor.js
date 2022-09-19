import { loadingInitialData, makeOrder } from '../../utils/burger-api'
import { checkResponse } from '../../utils/check-response'

export const GET_MENU_REQUEST = 'GET_MENU_REQUEST'
export const GET_MENU_SUCCESS = 'GET_MENU_SUCCESS'
export const GET_MENU_FAILED = 'GET_MENU_FAILED'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'

export const ADD_DATA_TO_MODAL = 'ADD_DATA_TO_MODAL'
export const REMOVE_DATA_MODAL = 'REMOVE_DATA_MODAL'

export const SEND_CHECKOUT_REQUEST = 'SEND_CHECKOUT_REQUEST'
export const SEND_CHECKOUT_SUCCESS = 'SEND_CHECKOUT_SUCCESS'
export const SEND_CHECKOUT_FAILED = 'SEND_CHECKOUT_FAILED'

export const DRAGGED_MOVE = 'DRAGGED_MOVE'

export const getMenu = () => {
  return function (dispatch) {
    dispatch({
      type: GET_MENU_REQUEST
    })
    loadingInitialData()
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: GET_MENU_SUCCESS,
          payload: res.data
        })
      })
      .catch((e) => {
        console.log(e)
        dispatch({
          type: GET_MENU_FAILED
        })
      })
  }
}

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
      .catch((e) => {
        console.log(e)
        dispatch({
          type: SEND_CHECKOUT_FAILED
        })
      })
  }
}
