import { deleteCookie, getCookie, setCookie } from '../../utils/cookie'
import { getUser, loginUser, logoutUser, registerUser, updateUser } from '../../utils/burger-api'
import { TUser } from '../types/data'
import { AppDispatch, IFormDataTypes } from '../../utils/types'

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED'
export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED'

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED'

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS'
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED'

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED'

export const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT'

export interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED
}

export interface IRegisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST
}

export interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS
  readonly data: TUser
}

export interface IRegisterUserFailed {
  readonly type: typeof REGISTER_USER_FAILED
  readonly error: string
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST
}

export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS
  readonly data: TUser
}

export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED
  readonly error: string
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS
  readonly data: TUser
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED
  readonly error: string
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS
  readonly data: TUser
}

export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED
  readonly error: string
}

export interface IUserLogout {
  readonly type: typeof USER_LOGOUT
}

export type TUserActions =
  | IAuthChecked
  | IRegisterUserRequest
  | IRegisterUserSuccess
  | IRegisterUserFailed
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | IUserLogout

export const checkUserAuth = () => {
  return function (dispatch: AppDispatch) {
    if (getCookie('accessToken')) {
      dispatch({
        type: GET_USER_REQUEST
      })
      getUser()
        .then((data: any) => {
          dispatch({ type: GET_USER_SUCCESS, data: data?.user })
          dispatch({ type: AUTH_CHECKED })
        })
        .catch((error) => {
          dispatch({ type: GET_USER_FAILED, error: error?.message })
        })
    } else {
      dispatch({ type: AUTH_CHECKED })
    }
  }
}

export const register = (data: IFormDataTypes) => (dispatch: AppDispatch) => {
  dispatch({
    type: REGISTER_USER_REQUEST
  })
  registerUser(data)
    .then(({ user, accessToken, refreshToken }: any) => {
      setCookie('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      dispatch({
        type: REGISTER_USER_SUCCESS,
        data: user
      })
    })
    .catch((error) => {
      dispatch({
        type: REGISTER_USER_FAILED,
        error: error?.message
      })
    })
}

export const login = (data: IFormDataTypes) => (dispatch: AppDispatch) => {
  dispatch({
    type: LOGIN_USER_REQUEST
  })
  loginUser(data)
    .then((data: any) => {
      setCookie('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      dispatch({
        type: LOGIN_USER_SUCCESS,
        data: data.user
      })
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_USER_FAILED,
        error: error?.message
      })
    })
}

export const logout = () => (dispatch: AppDispatch) => {
  return logoutUser()
    .then(() => {
      localStorage.clear()
      deleteCookie('accessToken')
      dispatch({ type: USER_LOGOUT })
    })
    .catch(() => {
      alert('Ошибка выполнения кода')
    })
}

export const update = (data: IFormDataTypes) => (dispatch: AppDispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST
  })
  updateUser(data)
    .then((data: any) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        data: data?.user
      })
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_FAILED,
        error: err
      })
    })
}
