import React, { useEffect } from 'react'
import styles from './app.module.scss'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getMenu } from '../../services/actions/ingredients'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMenu())
    // eslint-disable-next-line
  }, [])

  const { menu, menuRequest, menuFailed } = useSelector(
    (store) => store.ingredients
  )

  return (
    <div className="App">
      <AppHeader />
      <main>
        <div className="container">
          <article className={styles.flex}>
            <DndProvider backend={HTML5Backend}>
              {menuRequest && 'Загрузка...'}
              {menuFailed && 'Произошла ошибка'}
              {!menuRequest && !menuFailed && menu.length && (
                <>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </>
              )}
            </DndProvider>
          </article>
        </div>
      </main>
    </div>
  )
}

export default App
