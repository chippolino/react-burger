import React, { useEffect } from 'react'
import styles from './app.module.scss'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import useFetch from '../../hooks/use-fetch'
import { loadingInitialData } from '../../utils/burger-api'

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
