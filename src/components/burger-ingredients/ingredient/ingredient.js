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
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_DATA_TO_MODAL,
  ADD_INGREDIENT,
  REMOVE_DATA_MODAL
} from '../../../services/actions/burger-constructor'
import { usedCountSelector } from '../../../services/selectors'
import { useDrag } from 'react-dnd'
import { v4 as uuid } from 'uuid'

const Ingredient = (props) => {
  const { ingredient } = props
  const { isOpen, handleOpen, handleClose } = useModal()

  const dispatch = useDispatch()
  const uniqueId = uuid()
  const handleClick = () => {
    dispatch({ type: ADD_INGREDIENT, payload: ingredient._id, uniqueId })
  }

  const handleOpenModal = () => {
    dispatch({ type: ADD_DATA_TO_MODAL, payload: ingredient._id })
    handleOpen()
  }

  const handleCloseModal = () => {
    dispatch({
      type: REMOVE_DATA_MODAL
    })
    handleClose()
  }

  const [{ opacity }, ref] = useDrag({
    type: 'box',
    item: { ingredient },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        handleClick()
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const count = useSelector(usedCountSelector(ingredient._id))
  return (
    <>
      <li className={styles.item} ref={ref} style={{ opacity }}>
        <span className={styles.item} onClick={() => handleOpenModal()}>
          {count > 0 && <Counter count={+count} size="default" />}
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
        <Modal isOpen={isOpen} handleClose={handleCloseModal}>
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
