import { loadingInitialData } from '../../utils/burger-api'
import { checkResponse } from '../../utils/check-response'

export const GET_MENU_REQUEST = 'GET_MENU_REQUEST'
export const GET_MENU_SUCCESS = 'GET_MENU_SUCCESS'
export const GET_MENU_FAILED = 'GET_MENU_FAILED'

export const getMenu = () => {
  return function (dispatch) {
    dispatch({
      type: GET_MENU_REQUEST
    })
    loadingInitialData()
      .then(checkResponse)
      .then((res) => {
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
