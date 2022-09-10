import React from 'react'
import styles from './ingredient.module.scss'
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropTypes } from '../../../utils/prop-types'
import IngredientDetails from '../../ingredient-details/ingredient-details'
import useModal from '../../../hooks/use-modal'
import Modal from '../../modal/modal'

const Ingredient = (props) => {
  const { ingredient } = props
  const { isOpen, handleOpen, handleClose } = useModal()

  return (
    <>
      <li className={styles.item}>
        <span className={styles.item} onClick={handleOpen}>
          <Counter count={1} size="default" />
          <img
            className={styles.itemImage}
            src={ingredient.image_large}
            alt={ingredient.title}
            width={240}
            height={120}
          />
          <span
            className={`${styles.itemPrice} mt-1 text text_type_digits-default`}
          >
            {ingredient.price}
            <CurrencyIcon type="primary" />
          </span>
          <span
            className={`text text_type_main-default ${styles.itemText} mt-1`}
          >
            {ingredient.name}
          </span>
        </span>
      </li>

      {isOpen && (
        <Modal isOpen={isOpen} handleClose={handleClose}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired
}

export default Ingredient
