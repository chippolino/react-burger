import React from 'react'
import styles from './burger-constructor.module.scss'
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/prop-types'
import OrderDetails from '../order-details/order-details'
import Ingredient from './ingredient/ingredient'
import useModal from '../../hooks/use-modal'
import { ingredientTypes } from '../../utils/ingredient-types'

const BurgerConstructor = (props) => {
  const { ingredients } = props
  const { isOpen, handleOpen, handleClose } = useModal()

  const total = ingredients.reduce((prev, current) => prev + current.price, 0)
  return (
    <section className="pt-25">
      <ul className={styles.listBurger}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredients[0].name} (вверх)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
        <ul className={`customScrollbar ${styles.listIngredients}`}>
          {ingredients.map(
            (i) =>
              i.type !== ingredientTypes.bun && (
                <Ingredient ingredient={i} key={i._id} />
              )
          )}
        </ul>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredients[0].name} (низ)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      </ul>
      <div className={`mt-10 ${styles.totalWrap}`}>
        <span className={`text text_type_digits-medium ${styles.total}`}>
          {total}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleOpen}>
          Оформить заказ
        </Button>
      </div>

      <OrderDetails handleClose={handleClose} isOpen={isOpen} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes)
}

export default BurgerConstructor
