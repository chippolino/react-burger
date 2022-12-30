import { deleteCookie, getCookie, setCookie } from '../../utils/cookie'
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../../utils/burger-api'

export const AUTH_CHECKED = 'AUTH_CHECKED'

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

export const checkUserAuth = () => (dispatch) => {
  if (getCookie('accessToken')) {
    dispatch({
      type: GET_USER_REQUEST
    })
    getUser()
      .then((data) => {
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

export const register = (data) => (dispatch) => {
  dispatch({
    type: REGISTER_USER_REQUEST
  })
  registerUser(data)
    .then(({ user, accessToken, refreshToken }) => {
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

export const login = (data) => (dispatch) => {
  dispatch({
    type: LOGIN_USER_REQUEST
  })
  loginUser(data)
    .then(({ user, accessToken, refreshToken }) => {
      setCookie('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      dispatch({
        type: LOGIN_USER_SUCCESS,
        data: user
      })
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_USER_FAILED,
        error: error?.message
      })
    })
}

export const logout = () => (dispatch) => {
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

export const update = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST
  })
  updateUser(data)
    .then((data) => {
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
