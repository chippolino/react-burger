import styles from './ingredient-details.module.scss'
import { ingredientPropTypes } from '../../utils/prop-types'

const IngredientDetails = (props) => {
  const { ingredient } = props
  return (
    <div className={styles.root}>
      <p className={`text text_type_main-large ${styles.textDetails}`}>
        Детали ингредиента
      </p>
      <div className={styles.image}>
        <img
          src={ingredient.image_large}
          alt={ingredient.title}
          width={480}
          height={240}
        />
      </div>

      <p className={`text text_type_main-medium mt-4 ${styles.title}`}>
        {ingredient.name}
      </p>
      <ul className={`mt-8 ${styles.list}`}>
        <li className={styles.item}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default mt-2">
            {ingredient.calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default mt-2">
            {ingredient.proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default mt-2">{ingredient.fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default mt-2">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired
}

export default IngredientDetails
