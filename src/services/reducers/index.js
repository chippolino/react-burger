import { combineReducers } from 'redux'
import { burgerConstructorReducer } from './burger-constructor'
import { ingredientsReducer } from './ingredients'
import { orderDetailsReducer } from './order-details'
import { ingredientDetailsReducer } from './ingredient-details'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer
})
