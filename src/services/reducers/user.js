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

const initialState = {
  isAuthChecked: false,

  data: null,

  registerUserRequest: false,
  registerUserFailed: false,
  registerUserError: null,

  loginUserError: null,
  loginUserRequest: false,
  loginUserFailed: false,

  updateUserError: null,
  updateUserRequest: false,
  updateUserFailed: false,

  getUserError: null,
  getUserRequest: false,
  getUserFailed: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true
      }
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        registerUserRequest: false,
        registerUserFailed: false
      }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserFailed: true,
        registerUserRequest: false,
        registerUserError: action.error
      }
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isAuthCheck: true,
        loginUserFailed: false,
        loginUserRequest: false
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserFailed: true,
        loginUserError: action.error
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isAuthCheck: true,
        getUserFailed: false,
        getUserRequest: false
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserError: action.error
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isAuthCheck: true,
        updateUserFailed: false,
        updateUserRequest: false
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserError: action.error
      }
    }
    case USER_LOGOUT: {
      return {
        ...state,
        data: null
      }
    }
    default: {
      return state
    }
  }
}
