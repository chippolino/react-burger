import {
  ADD_DATA_TO_MODAL,
  ADD_INGREDIENT,
  DRAGGED_MOVE,
  GET_MENU_FAILED,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  REMOVE_DATA_MODAL,
  REMOVE_INGREDIENT,
  SEND_CHECKOUT_FAILED,
  SEND_CHECKOUT_REQUEST,
  SEND_CHECKOUT_SUCCESS
} from '../actions/burger-constructor'
import { ingredientTypes } from '../../utils/ingredient-types'

const initialState = {
  menu: [],
  menuRequest: false,
  menuFailed: false,

  cart: {
    bun: {},
    items: []
  },

  currentModal: {},
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_REQUEST: {
      return { ...state, menuRequest: true }
    }
    case GET_MENU_SUCCESS: {
      return {
        ...state,
        menu: action.payload,
        menuRequest: false,
        menuFailed: false
      }
    }
    case GET_MENU_FAILED: {
      return { ...state, menuFailed: true, menuRequest: false }
    }
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
      return { ...state, orderDetailsFailed: true, orderDetailsRequest: false }
    }
    case ADD_INGREDIENT: {
      const ingredient = JSON.parse(JSON.stringify(state.menu)).find(
        (item) => item._id === action.payload
      )
      Object.defineProperty(ingredient, 'uniqueId', {
        value: action.uniqueId,
        writable: true,
        enumerable: true,
        configurable: true
      })

      if (ingredient.type === ingredientTypes.bun) {
        if (state.cart.bun._id === action.payload) {
          return state
        } else {
          return {
            ...state,
            cart: { ...state.cart, bun: ingredient }
          }
        }
      }

      return {
        ...state,
        cart: { ...state.cart, items: [...state.cart.items, ingredient] }
      }
    }
    case REMOVE_INGREDIENT: {
      const index = state.cart.items.findIndex(
        (i) => i.uniqueId === action.payload
      )
      const newCartItems = state.cart.items
      newCartItems.splice(index, 1)
      return {
        ...state,
        cart: {
          ...state.cart,
          items: newCartItems
        }
      }
    }
    case ADD_DATA_TO_MODAL: {
      const ingredient = state.menu.find((i) => i._id === action.payload)
      return {
        ...state,
        currentModal: ingredient
      }
    }
    case REMOVE_DATA_MODAL: {
      return {
        ...state,
        currentModal: {}
      }
    }
    case DRAGGED_MOVE: {
      const newCartItems = [...state.cart.items]
      const currentItem = action.currentItem
      const overIndex = action.overIndex
      const currentIndex = newCartItems.findIndex(
        (i) => i.uniqueId === currentItem.ingredient.uniqueId
      )
      newCartItems.splice(currentIndex, 1)
      newCartItems.splice(overIndex, 0, currentItem.ingredient)

      return {
        ...state,
        cart: { ...state.cart, items: newCartItems }
      }
    }
    default: {
      return state
    }
  }
}
