const BASE_URL_API = 'https://norma.nomoreparties.space/api'

function loadingInitialData() {
  return fetch(`${BASE_URL_API}/ingredients`)
}

export { loadingInitialData }
