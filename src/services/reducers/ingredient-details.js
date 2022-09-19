import {
  ADD_DATA_TO_MODAL,
  REMOVE_DATA_MODAL
} from '../actions/ingredient-details'

const initialState = {
  currentModal: {}
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_TO_MODAL: {
      return {
        ...state,
        currentModal: action.payload
      }
    }
    case REMOVE_DATA_MODAL: {
      return {
        ...state,
        currentModal: {}
      }
    }
    default: {
      return state
    }
  }
}
