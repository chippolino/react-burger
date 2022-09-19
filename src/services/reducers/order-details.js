import {
  SEND_CHECKOUT_FAILED,
  SEND_CHECKOUT_REQUEST,
  SEND_CHECKOUT_SUCCESS
} from '../actions/order-details'

const initialState = {
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orderDetailsError: null
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CHECKOUT_REQUEST: {
      return { ...state, orderDetailsRequest: true }
    }
    case SEND_CHECKOUT_SUCCESS: {
      return {
        ...state,
        orderDetails: action.payload,
        orderDetailsRequest: false,
        orderDetailsFailed: false
      }
    }
    case SEND_CHECKOUT_FAILED: {
      return {
        ...state,
        orderDetailsFailed: true,
        orderDetailsRequest: false,
        orderDetailsError: action.error
      }
    }
    default: {
      return state
    }
  }
}
