import { ingredientTypes } from '../../utils/ingredient-types'

export const totalCartSelector = (state) => {
  const initialValue = state.burgerConstructor.cart.bun.price * 2 || 0
  return state.burgerConstructor.cart.items.reduce((prev, current) => {
    const price =
      current.type === ingredientTypes.bun ? current.price * 2 : current.price
    return prev + price
  }, initialValue)
}

export const isOrderAvailable = (state) => {
  return Object.keys(state.burgerConstructor.cart.bun).length > 0
}

export const usedCountSelector = (id) => (state) => {
  const newMenu = [
    ...state.burgerConstructor.cart.items,
    state.burgerConstructor.cart.bun
  ]
  const ingredientInCart = newMenu.filter((i) => i._id === id)

  if (!ingredientInCart) {
    return 0
  } else {
    return ingredientInCart.length
  }
}

export const findIndexSelector = (id) => (state) => {
  const cartItems = state.burgerConstructor.cart.items
  const item = cartItems.filter((i) => i.uniqueId === id)[0]
  return {
    item,
    index: cartItems.indexOf(item)
  }
}
