import {
  ADD_INGREDIENT,
  DRAGGED_MOVE,
  REMOVE_INGREDIENT
} from '../actions/burger-constructor'
import { ingredientTypes } from '../../utils/ingredient-types'

const initialState = {
  cart: {
    bun: {},
    items: []
  }
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === ingredientTypes.bun) {
        if (state.cart.bun._id === action.payload) {
          return state
        } else {
          return {
            ...state,
            cart: { ...state.cart, bun: action.ingredient }
          }
        }
      }
      return {
        ...state,
        cart: { ...state.cart, items: [...state.cart.items, action.ingredient] }
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
