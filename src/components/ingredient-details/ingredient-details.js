import styles from './ingredient-details.module.scss'
import { useSelector } from 'react-redux'

const IngredientDetails = () => {
  const { currentModal } = useSelector((state) => state.ingredientDetails)

  return (
    <div className={styles.root}>
      <p className={`text text_type_main-large ${styles.textDetails}`}>
        Детали ингредиента
      </p>
      <div className={styles.image}>
        <img
          src={currentModal.image_large}
          alt={currentModal.title}
          width={480}
          height={240}
        />
      </div>

      <p className={`text text_type_main-medium mt-4 ${styles.title}`}>
        {currentModal.name}
      </p>
      <ul className={`mt-8 ${styles.list}`}>
        <li className={styles.item}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default mt-2">
            {currentModal.calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default mt-2">
            {currentModal.proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default mt-2">
            {currentModal.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default mt-2">
            {currentModal.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails
