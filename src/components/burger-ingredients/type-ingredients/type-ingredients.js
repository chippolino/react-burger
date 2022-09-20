import React, { forwardRef } from 'react'
import styles from './type-ingredients.module.scss'
import Ingredient from '../ingredient/ingredient'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../../utils/prop-types'

const TypeIngredients = forwardRef(({ ingredients, type, title }, ref) => {
  return (
    <div className={`mt-10`} ref={ref} id={type}>
      <h3 className="text text_type_main-medium">{title}</h3>
      <ul className={`mt-6 ${styles.list} pl-4 pr-4`}>
        {ingredients
          .filter((i) => i.type === type)
          .map((i) => (
            <Ingredient ingredient={i} key={i._id} />
          ))}
      </ul>
    </div>
  )
})

TypeIngredients.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default TypeIngredients
