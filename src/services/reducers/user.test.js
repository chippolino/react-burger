import { initialState, userReducer } from './user'
import {
  AUTH_CHECKED,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGOUT
} from '../actions/user'
import { user, userError } from '../../utils/mock'

describe('user reducer', () => {
  it('Проверка начального состояния', () => {
    const result = userReducer(initialState, {})
    expect(result).toEqual(initialState)
  })
  it('Проверка авторизован ли пользователь', () => {
    const result = userReducer(initialState, { type: AUTH_CHECKED })
    expect(result).toEqual({ ...initialState, isAuthChecked: true })
  })
  it('Запрос на вход пользователя', () => {
    const result = userReducer(initialState, { type: LOGIN_USER_REQUEST })
    expect(result).toEqual({ ...initialState, loginUserRequest: true })
  })
  it('Ошбка запроса на вход пользователя', () => {
    const result = userReducer(initialState, { type: LOGIN_USER_FAILED, error: userError })
    expect(result).toEqual({
      ...initialState,
      loginUserFailed: true,
      loginUserRequest: false,
      loginUserError: userError
    })
  })
  it('Успешный запрос на вход пользоваетля', () => {
    const result = userReducer(initialState, { type: LOGIN_USER_SUCCESS, data: user })
    expect(result).toEqual({
      ...initialState,
      data: user,
      isAuthCheck: true,
      loginUserFailed: false,
      loginUserRequest: false
    })
  })
  it('Запрос на регистрацию', () => {
    const result = userReducer(initialState, { type: REGISTER_USER_REQUEST })
    expect(result).toEqual({ ...initialState, registerUserRequest: true })
  })
  it('Ошибка запроса на регистрацию', () => {
    const result = userReducer(initialState, { type: REGISTER_USER_FAILED, error: userError })
    expect(result).toEqual({
      ...initialState,
      registerUserFailed: true,
      registerUserRequest: false,
      registerUserError: userError
    })
  })
  it('Успешный запрос на регистрацию', () => {
    const result = userReducer(initialState, { type: REGISTER_USER_SUCCESS, data: user })
    expect(result).toEqual({ ...initialState, data: user, registerUserRequest: false, registerUserFailed: false })
  })
  it('Получение пользователя', () => {
    const result = userReducer(initialState, { type: GET_USER_REQUEST })
    expect(result).toEqual({ ...initialState, getUserRequest: true })
  })
  it('Ошибка получение пользователя', () => {
    const result = userReducer(initialState, { type: GET_USER_FAILED, error: userError })
    expect(result).toEqual({ ...initialState, getUserFailed: true, getUserRequest: false, getUserError: userError })
  })
  it('Успешное получение пользователя', () => {
    const result = userReducer(initialState, { type: GET_USER_SUCCESS, data: user })
    expect(result).toEqual({
      ...initialState,
      data: user,
      isAuthCheck: true,
      getUserFailed: false,
      getUserRequest: false
    })
  })
  it('Обновление пользователя', () => {
    const result = userReducer(initialState, { type: UPDATE_USER_REQUEST })
    expect(result).toEqual({ ...initialState, updateUserRequest: true })
  })
  it('Ошибка обновления пользователя', () => {
    const result = userReducer(initialState, { type: UPDATE_USER_FAILED, error: userError })
    expect(result).toEqual({
      ...initialState,
      updateUserFailed: true,
      updateUserRequest: false,
      updateUserError: userError
    })
  })
  it('Успешное обновление пользователя', () => {
    const result = userReducer(initialState, { type: UPDATE_USER_SUCCESS, data: user })
    expect(result).toEqual({
      ...initialState,
      data: user,
      isAuthCheck: true,
      updateUserFailed: false,
      updateUserRequest: false
    })
  })

  it('Выход из личного кабинета', () => {
    const result = userReducer(initialState, { type: USER_LOGOUT })
    expect(result).toEqual({ ...initialState, data: null })
  })
})
