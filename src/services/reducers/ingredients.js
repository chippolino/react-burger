import {
  GET_MENU_FAILED,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS
} from '../actions/ingredients'

const initialState = {
  menu: [],
  menuRequest: false,
  menuFailed: false,
  menuFailedError: null
}

export const ingredientsReducer = (state = initialState, action) => {
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
        menuRequest: false,
        menuFailedError: action.error
      }
    }
    default: {
      return state
    }
  }
}
