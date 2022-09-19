export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'

export const DRAGGED_MOVE = 'DRAGGED_MOVE'

export const addIngredient = (ingredientId, uniqueId) => {
  return function (dispatch, getState) {
    const state = getState()

    const ingredient = JSON.parse(JSON.stringify(state.ingredients.menu)).find(
      (item) => item._id === ingredientId
    )
    Object.defineProperty(ingredient, 'uniqueId', {
      value: uniqueId,
      writable: true,
      enumerable: true,
      configurable: true
    })

    dispatch({
      type: ADD_INGREDIENT,
      ingredient,
      payload: ingredientId
    })
  }
}
