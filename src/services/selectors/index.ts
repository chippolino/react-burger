import { ingredientTypes } from '../../utils/ingredient-types'
import { RootState } from '../../utils/types'

export const totalCartSelector = (state: RootState) => {
  const initialValue = state.burgerConstructor.bun.price * 2 || 0
  // @ts-ignore
  return state.burgerConstructor.items.reduce((prev, current) => {
    const price = current.type === ingredientTypes.bun ? current.price * 2 : current.price
    return prev + price
  }, initialValue)
}

export const isOrderAvailable = (state: RootState) => {
  return Object.keys(state.burgerConstructor.bun).length > 0
}

export const usedCountSelector = (id: string) => (state: RootState) => {
  const newMenu = [...state.burgerConstructor.items, state.burgerConstructor.bun]
  const ingredientInCart = newMenu.filter((i) => i._id === id)

  if (!ingredientInCart) {
    return 0
  } else {
    return ingredientInCart.length
  }
}

export const findIndexSelector = (id: string | undefined) => (state: RootState) => {
  const cartItems = state.burgerConstructor.items
  const item = cartItems.filter((i) => i.uniqueId === id)[0]
  return {
    item,
    index: cartItems.indexOf(item)
  }
}
