import { combineReducers } from 'redux'
import { burgerConstructorReducer } from './burger-constructor'
import { ingredientsReducer } from './ingredients'
import { orderDetailsReducer } from './order-details'
import { userReducer } from './user'
import { wsReducer } from './wsReducer'

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  ws: wsReducer
})
