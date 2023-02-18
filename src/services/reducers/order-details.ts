import {
  SEND_CHECKOUT_FAILED,
  SEND_CHECKOUT_REQUEST,
  SEND_CHECKOUT_SUCCESS,
  TSendCheckoutActions
} from '../actions/order-details'

export type TOrderDetailsState = {
  orderDetails: any
  orderDetailsRequest: boolean
  orderDetailsFailed: boolean
}

export const initialState: TOrderDetailsState = {
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false
}

export const orderDetailsReducer = (state = initialState, action: TSendCheckoutActions) => {
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
        orderDetailsRequest: false
      }
    }
    default: {
      return state
    }
  }
}
