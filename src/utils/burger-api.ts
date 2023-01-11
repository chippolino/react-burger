import { checkResponse } from './check-response'
import { getCookie, setCookie } from './cookie'
import { TIngredientPropTypes } from './prop-types'

const BASE_URL_API = 'https://norma.nomoreparties.space/api'

type TUser = {
  email?: string
  password?: string
  name?: string
}

type TRefreshToken = {
  success: boolean
  accessToken: string
  refreshToken: string
  message?: string
}

const loadingInitialData = () => {
  return fetch(`${BASE_URL_API}/ingredients`)
}

const makeOrder = (ingredients: TIngredientPropTypes) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients })
  }
  return fetch(`${BASE_URL_API}/orders`, requestOptions)
}

const refreshToken = () => {
  return fetch(`${BASE_URL_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<TRefreshToken>(res))
}

const fetchWithRefresh = async (
  url: RequestInfo | URL,
  options: RequestInit | undefined
) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      if (!refreshData?.success) {
        return Promise.reject(refreshData)
      }
      localStorage.setItem('refreshToken', refreshData?.refreshToken)
      setCookie('accessToken', refreshData.accessToken)
      const newOptions = {
        ...options,
        headers: { ...options?.headers, authorization: refreshData.accessToken }
      }
      const res = await fetch(url, newOptions)
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}

const registerUser = (data: TUser) => {
  return fetch(`${BASE_URL_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(checkResponse)
}

const loginUser = (data: TUser) => {
  return fetch(`${BASE_URL_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
    .then((data: any) => {
      if (data?.success) return data
      return Promise.reject(data)
    })
}

const logoutUser = () => {
  return fetchWithRefresh(`${BASE_URL_API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

const getUser = () => {
  return fetchWithRefresh(`${BASE_URL_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    }
  })
}

const updateUser = (data: TUser) => {
  return fetchWithRefresh(`${BASE_URL_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
}

const forgotPassword = (data: TUser) => {
  return fetch(`${BASE_URL_API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then((res) => checkResponse<TRefreshToken>(res))
}

const resetPassword = (data: TUser) => {
  return fetch(`${BASE_URL_API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then((res) => checkResponse<TRefreshToken>(res))
}

export {
  loadingInitialData,
  makeOrder,
  fetchWithRefresh,
  refreshToken,
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  forgotPassword,
  resetPassword
}
