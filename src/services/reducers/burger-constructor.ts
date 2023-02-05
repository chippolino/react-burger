import {
  ADD_INGREDIENT,
  DRAGGED_MOVE,
  REMOVE_INGREDIENT,
  TBurgerConstructorActions
} from '../actions/burger-constructor'
import { ingredientTypes } from '../../utils/ingredient-types'
import { TIngredientPropTypes } from '../../utils/types'

type TBurgerConstructorState = {
  bun: TIngredientPropTypes | null
  items: Array<TIngredientPropTypes>
}

const initialState: TBurgerConstructorState = {
  bun: {} as TIngredientPropTypes,
  items: []
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const ingredient = JSON.parse(JSON.stringify(action.ingredient))

      Object.defineProperty(ingredient, 'uniqueId', {
        value: action.uniqueId,
        writable: true,
        enumerable: true,
        configurable: true
      })

      if (action.ingredient.type === ingredientTypes.bun) {
        if (state.bun !== null) {
          if (state.bun._id === ingredient._id) {
            return state
          } else {
            return {
              ...state,
              bun: ingredient
            }
          }
        }
      }
      return {
        ...state,
        items: [...state.items, ingredient]
      }
    }
    case REMOVE_INGREDIENT: {
      const index = state.items.findIndex((i) => i.uniqueId === action.payload)
      const newCartItems = state.items
      newCartItems.splice(index, 1)
      return {
        ...state,
        items: newCartItems
      }
    }

    case DRAGGED_MOVE: {
      const newCartItems = [...state.items]
      const currentItem = action.currentItem
      console.log(currentItem)
      const overIndex = action.overIndex
      const currentIndex = newCartItems.findIndex((i) => i.uniqueId === currentItem.ingredient.uniqueId)
      newCartItems.splice(currentIndex, 1)
      newCartItems.splice(overIndex, 0, currentItem.ingredient)

      return {
        ...state,
        items: newCartItems
      }
    }
    default: {
      return state
    }
  }
}
