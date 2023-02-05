import { TIngredientPropTypes } from '../../utils/types'

export type TUser = {
  readonly email: string
  readonly name: string
}

export type TOrder = {
  readonly _id: string
  readonly ingredients: Array<string>
  readonly status: string
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly number: number
}

export type TOrders<T> = {
  readonly orders: Array<T>
  readonly success: boolean
  readonly total: number
  readonly totalToday: number
}

export type TDraggedMoveProps = {
  findIndex: {
    index: number
    item: TIngredientPropTypes
  }
  ingredient: TIngredientPropTypes
}
