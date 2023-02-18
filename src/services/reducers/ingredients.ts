import { GET_MENU_FAILED, GET_MENU_REQUEST, GET_MENU_SUCCESS, TMenuActions } from '../actions/ingredients'
import { TIngredientPropTypes } from '../../utils/types'

export type TIngredientsState = {
  menu: Array<TIngredientPropTypes>

  menuRequest: boolean
  menuFailed: boolean
}

export const initialState: TIngredientsState = {
  menu: [],
  menuRequest: false,
  menuFailed: false
}

export const ingredientsReducer = (state = initialState, action: TMenuActions) => {
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
      return {
        ...state,
        menuFailed: true,
        menuRequest: false
      }
    }
    default: {
      return state
    }
  }
}
