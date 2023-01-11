import styles from './ingredient-details.module.scss'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ReactComponent as Loader } from '../../images/page-loader.svg'
import { TIngredientPropTypes } from '../../utils/prop-types'

const IngredientDetails = () => {
  const { menu } = useSelector((state: any) => state.ingredients)
  const { id } = useParams<{ id: string }>()

  const ingredient = menu.find((item: TIngredientPropTypes) => item._id === id)

  return (
    <div>
      <p className={`text text_type_main-large ${styles.textDetails}`}>
        Детали ингредиента
      </p>
      {typeof ingredient === 'undefined' ? (
        <Loader width={100} height={100} className={`${styles.loader} mt-30`} />
      ) : (
        <>
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
            <li>
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
              <p className="text text_type_digits-default mt-2">
                {ingredient.fat}
              </p>
            </li>
            <li>
              <p className="text text_type_main-default">Углеводы, г</p>
              <p className="text text_type_digits-default mt-2">
                {ingredient.carbohydrates}
              </p>
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

export default IngredientDetails
