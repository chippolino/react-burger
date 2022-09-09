import { useState } from 'react'

function checkResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

function useFetch(requestFn) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [data, setData] = useState()

  function execute() {
    setHasError(false)
    setIsLoading(true)
    requestFn()
      .then(checkResponse)
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setHasError(true)
      })
  }

  return {
    hasError,
    isLoading,
    data,
    execute
  }
}

export default useFetch
