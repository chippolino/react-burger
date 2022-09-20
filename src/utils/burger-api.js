const BASE_URL_API = 'https://norma.nomoreparties.space/api'

function loadingInitialData() {
  return fetch(`${BASE_URL_API}/ingredients`)
}

function makeOrder(ingredients) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients })
  }
  return fetch(`${BASE_URL_API}/orders`, requestOptions)
}

export { loadingInitialData, makeOrder }
