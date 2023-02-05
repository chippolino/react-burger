import { loadingInitialData } from '../../utils/burger-api'
import { checkResponse } from '../../utils/check-response'
import { AppDispatch, TIngredientPropTypes } from '../../utils/types'

export const GET_MENU_REQUEST: 'GET_MENU_REQUEST' = 'GET_MENU_REQUEST'
export const GET_MENU_SUCCESS: 'GET_MENU_SUCCESS' = 'GET_MENU_SUCCESS'
export const GET_MENU_FAILED: 'GET_MENU_FAILED' = 'GET_MENU_FAILED'

export interface IGetMenuRequest {
  readonly type: typeof GET_MENU_REQUEST
}

export interface IGetMenuSuccess {
  readonly type: typeof GET_MENU_SUCCESS
  readonly payload: Array<TIngredientPropTypes>
}

export interface IGetMenuFailed {
  readonly type: typeof GET_MENU_FAILED
  readonly error: string
}

export type TMenuActions = IGetMenuRequest | IGetMenuSuccess | IGetMenuFailed

export const getMenu = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_MENU_REQUEST
    })
    loadingInitialData()
      .then(checkResponse)
      .then((res: any) => {
        dispatch({
          type: GET_MENU_SUCCESS,
          payload: res.data
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_MENU_FAILED,
          error
        })
      })
  }
}
