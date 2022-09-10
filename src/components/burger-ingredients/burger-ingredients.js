import React, { useState } from 'react'
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/prop-types'
import { ingredientTypes } from '../../utils/ingredient-types'
import TypeIngredients from './type-ingredients/type-ingredients'

const BurgerIngredients = (props) => {
  const { ingredients } = props
  const [current, setCurrent] = useState(ingredientTypes.bun)

  return (
    <section className={`pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`mt-5 ${styles.flex}`}>
        <Tab
          value={ingredientTypes.bun}
          active={current === ingredientTypes.bun}
          onClick={setCurrent}
        >
          Булки
        </Tab>
        <Tab
          value={ingredientTypes.sauce}
          active={current === ingredientTypes.sauce}
          onClick={setCurrent}
        >
          Соусы
        </Tab>
        <Tab
          value={ingredientTypes.main}
          active={current === ingredientTypes.main}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>

      <div className={`customScrollbar ${styles.wrapper}`}>
        <TypeIngredients
          type={ingredientTypes.bun}
          title="Булки"
          ingredients={ingredients}
        />
        <TypeIngredients
          type={ingredientTypes.sauce}
          title="Соусы"
          ingredients={ingredients}
        />
        <TypeIngredients
          type={ingredientTypes.main}
          title="Начинки"
          ingredients={ingredients}
        />
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes)
}

export default BurgerIngredients
