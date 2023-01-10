import React, { forwardRef } from 'react'
import styles from './type-ingredients.module.scss'
import Ingredient from '../ingredient/ingredient'
import { TIngredientPropTypes } from '../../../utils/prop-types'

type TTypeIngredients = {
  type: string
  title: string
  ingredients: TIngredientPropTypes[]
}

export type Ref = HTMLDivElement

const TypeIngredients = forwardRef<Ref, TTypeIngredients>((props, ref) => {
  const { ingredients, title, type } = props
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

export default TypeIngredients
