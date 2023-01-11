import { FC } from 'react'
import styles from '../burger-constructor.module.scss'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredientPropTypes } from '../../../utils/prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  DRAGGED_MOVE,
  REMOVE_INGREDIENT
} from '../../../services/actions/burger-constructor'
import { useDrag, useDrop } from 'react-dnd'
import { findIndexSelector } from '../../../services/selectors'

type TIngredient = {
  ingredient: TIngredientPropTypes
}

const Ingredient: FC<TIngredient> = (props) => {
  const { ingredient } = props

  const dispatch = useDispatch()

  const handleRemoveIngredient = () => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: ingredient.uniqueId
    })
  }

  const findIndex = useSelector(findIndexSelector(ingredient.uniqueId))

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'drag',
      item: { ingredient, findIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          dispatch({
            type: DRAGGED_MOVE,
            currentItem: item,
            overIndex: findIndex.index
          })
        }
      }
    }),
    [ingredient, findIndex]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'drag',
      hover(currentItem: { ingredient: TIngredientPropTypes }) {
        if (currentItem.ingredient.uniqueId !== ingredient.uniqueId) {
          const { index: overIndex } = findIndex
          dispatch({
            type: DRAGGED_MOVE,
            currentItem: currentItem,
            overIndex: overIndex
          })
        }
      }
    }),
    [findIndex]
  )

  const opacity = isDragging ? 0 : 1

  return (
    <li
      className={styles.itemIngredients}
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    >
      <span className={styles.dragArea}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleRemoveIngredient()}
      />
    </li>
  )
}

export default Ingredient
