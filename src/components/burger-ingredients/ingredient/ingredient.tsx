import React, { FC } from 'react'
import styles from './ingredient.module.scss'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredientPropTypes } from '../../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_INGREDIENT } from '../../../services/actions/burger-constructor'
import { usedCountSelector } from '../../../services/selectors'
import { useDrag } from 'react-dnd'
import { v4 as uuid } from 'uuid'
import { Link, useLocation } from 'react-router-dom'

type TIngredient = {
  ingredient: TIngredientPropTypes
}

const Ingredient: FC<TIngredient> = (props) => {
  const { ingredient } = props

  const location = useLocation()
  const dispatch = useDispatch()
  const uniqueId = uuid()
  const handleClick = () => {
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: ingredient,
      uniqueId: uniqueId
    })
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
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location }
        }}
        className={styles.item}
        ref={ref}
        style={{ opacity }}
      >
        <span className={styles.item} data-cy-test="ingredient">
          {count > 0 && <Counter count={+count} size="default" />}
          <img
            className={styles.itemImage}
            src={ingredient.image_large}
            alt={ingredient.title}
            width={240}
            height={120}
          />
          <span className={`${styles.itemPrice} mt-1 text text_type_digits-default`}>
            {ingredient.price}
            <CurrencyIcon type="primary" />
          </span>
          <span className={`text text_type_main-default ${styles.itemText} mt-1`}>{ingredient.name}</span>
        </span>
      </Link>
    </>
  )
}

export default Ingredient
