import React from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { data } from '../../utils/data'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <div className="container">
          <article className={styles.flex}>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </article>
        </div>
      </main>
    </div>
  )
}

export default App
