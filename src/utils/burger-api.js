const URL_TO_API = 'https://norma.nomoreparties.space/api/ingredients'

function loadingInitialData() {
  return fetch(URL_TO_API)
}

export { loadingInitialData }
