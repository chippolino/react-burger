import React, { useEffect } from 'react'
import styles from './app.module.scss'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import useFetch from '../../hooks/use-fetch'

const URL_TO_API = 'https://norma.nomoreparties.space/api/ingredients'

function loadingInitialData() {
  return fetch(URL_TO_API)
}

function App() {
  const {
    isLoading,
    hasError,
    data: ingredients,
    execute: getIngredients
  } = useFetch(loadingInitialData)

  useEffect(() => {
    getIngredients()
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <div className="container">
          <article className={styles.flex}>
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {!isLoading && !hasError && ingredients?.data.length && (
              <>
                <BurgerIngredients ingredients={ingredients.data} />
                <BurgerConstructor ingredients={ingredients.data} />
              </>
            )}
          </article>
        </div>
      </main>
    </div>
  )
}

export default App
