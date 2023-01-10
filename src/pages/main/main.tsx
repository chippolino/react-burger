import { useSelector } from 'react-redux'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'

export const Main = () => {
  const { menu, menuRequest, menuFailed } = useSelector(
    (store: any) => store.ingredients
  )

  return (
    <div className="container">
      <article className="flex">
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
  )
}
