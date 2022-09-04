import React, { useState } from 'react'
import styles from './burger-ingredients.module.css'
import {
  Tab,
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

const BurgerIngredients = (props) => {
  const { data } = props
  const [current, setCurrent] = useState('bun')

  return (
    <section className={`pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`mt-5 ${styles.flex}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={`customScrollbar ${styles.wrapper}`}>
        <TypeIngredients type={'bun'} title="Булки" data={data} />
        <TypeIngredients type={'sauce'} title="Соусы" data={data} />
        <TypeIngredients type={'main'} title="Начинки" data={data} />
      </div>
    </section>
  )
}

const TypeIngredients = (props) => {
  const { data, type, title } = props
  return (
    <div className={`mt-10`}>
      <h3 className="text text_type_main-medium">{title}</h3>
      <ul className={`mt-6 ${styles.list} pl-4 pr-4`}>
        {data
          .filter((i) => i.type === type)
          .map((i) => (
            <Ingredient data={i} key={i._id} />
          ))}
      </ul>
    </div>
  )
}

const Ingredient = (props) => {
  const { data } = props
  return (
    <li className={styles.item}>
      <Counter count={1} size="default" />
      <img className={styles.itemImage} src={data.image_large} alt="" />
      <span className={`${styles.itemPrice} mt-1`}>
        {data.price}
        <CurrencyIcon type="primary" />
      </span>
      <span className={`text text_type_main-default ${styles.itemText} mt-1`}>
        {data.name}
      </span>
    </li>
  )
}

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
})

TypeIngredients.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  data: ingredientPropTypes
}

Ingredient.propTypes = {
  data: ingredientPropTypes
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes)
}

export default BurgerIngredients
