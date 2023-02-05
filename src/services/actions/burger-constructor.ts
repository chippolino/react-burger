import { TIngredientPropTypes } from '../../utils/types'
import { TDraggedMoveProps } from '../types/data'

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT'

export const DRAGGED_MOVE: 'DRAGGED_MOVE' = 'DRAGGED_MOVE'

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT
  readonly ingredient: TIngredientPropTypes
  readonly uniqueId: string
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT
  readonly payload: string
}

export interface IDraggedMove {
  readonly type: typeof DRAGGED_MOVE
  readonly currentItem: TDraggedMoveProps
  readonly overIndex: number
}

export type TBurgerConstructorActions =
  | IAddIngredient
  | IRemoveIngredient
  | IDraggedMove
