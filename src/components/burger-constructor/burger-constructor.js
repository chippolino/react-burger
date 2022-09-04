import React from 'react'
import styles from './burger-constructor.module.css'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types'

const BurgerConstructor = (props) => {
  const { data } = props

  const total = data.reduce((prev, current) => prev + current.price, 0)
  return (
    <section className="pt-25">
      <ul className={styles.listBurger}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name + ' (вверх)'}
          price={data[0].price}
          thumbnail={data[0].image}
        />
        <ul className={`customScrollbar ${styles.listIngredients}`}>
          {data.map(
            (i) => i.type !== 'bun' && <Ingredient data={i} key={i._id} />
          )}
        </ul>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[data.length - 1].name + ' (низ)'}
          price={data[data.length - 1].price}
          thumbnail={data[data.length - 1].image}
        />
      </ul>
      <div className={`mt-10 ${styles.totalWrap}`}>
        <span className={styles.total}>
          {total}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

const Ingredient = (props) => {
  const { data } = props
  return (
    <li className={styles.itemIngredients}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
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

Ingredient.protoTypes = {
  data: ingredientPropTypes
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes)
}

export default BurgerConstructor
