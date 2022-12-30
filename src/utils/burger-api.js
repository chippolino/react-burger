import { checkResponse } from './check-response'
import { getCookie, setCookie } from './cookie'

const BASE_URL_API = 'https://norma.nomoreparties.space/api'

const loadingInitialData = () => {
  return fetch(`${BASE_URL_API}/ingredients`)
}

const makeOrder = (ingredients) => {
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
  }).then(checkResponse)
}

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}

const registerUser = (data) => {
  return fetch(`${BASE_URL_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(checkResponse)
}

const loginUser = (data) => {
  return fetch(`${BASE_URL_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
    .then((data) => {
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
      Authorization: getCookie('accessToken')
    }
  })
}

const updateUser = (data) => {
  return fetchWithRefresh(`${BASE_URL_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
}

const forgotPassword = (data) => {
  return fetchWithRefresh(`${BASE_URL_API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}

const resetPassword = (data) => {
  return fetchWithRefresh(`${BASE_URL_API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
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
