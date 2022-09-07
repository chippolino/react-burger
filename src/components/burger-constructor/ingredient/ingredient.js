import styles from '../burger-constructor.module.scss'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropTypes } from '../../../utils/prop-types'

const Ingredient = (props) => {
  const { ingredient } = props
  return (
    <li className={styles.itemIngredients}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired
}

export default Ingredient
