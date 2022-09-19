import React, { useEffect, useRef, useState } from 'react'
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientTypes } from '../../utils/ingredient-types'
import TypeIngredients from './type-ingredients/type-ingredients'
import { useSelector } from 'react-redux'

const BurgerIngredients = () => {
  const { menu } = useSelector((store) => store.burgerConstructor)

  const mainRef = useRef(null)
  const bunRef = useRef(null)
  const sauceRef = useRef(null)

  const [current, setCurrent] = useState(ingredientTypes.bun)

  useEffect(() => {
    let observer
    if (mainRef.current && bunRef.current && sauceRef.current) {
      const options = {
        rootMargin: '-40% 0px -60%'
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleClick(entry.target.id)
          }
        })
      }, options)
      observer.observe(bunRef.current)
      observer.observe(sauceRef.current)
      observer.observe(mainRef.current)
    }
    return () => observer.disconnect()
  }, [mainRef, sauceRef, bunRef])

  const handleClick = (value) => {
    setCurrent(value)
  }

  const handleTabClick = (ref) => {
    ref.current.scrollIntoView()
  }

  return (
    <section className={`pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`mt-5 ${styles.flex}`}>
        <Tab
          value={ingredientTypes.bun}
          active={current === ingredientTypes.bun}
          onClick={() => handleTabClick(bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value={ingredientTypes.sauce}
          active={current === ingredientTypes.sauce}
          onClick={() => handleTabClick(sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value={ingredientTypes.main}
          active={current === ingredientTypes.main}
          onClick={() => handleTabClick(mainRef)}
        >
          Начинки
        </Tab>
      </div>

      <div className={`customScrollbar ${styles.wrapper}`}>
        <TypeIngredients
          type={ingredientTypes.bun}
          title="Булки"
          ingredients={menu}
          ref={bunRef}
        />
        <TypeIngredients
          type={ingredientTypes.sauce}
          title="Соусы"
          ingredients={menu}
          ref={sauceRef}
        />
        <TypeIngredients
          type={ingredientTypes.main}
          title="Начинки"
          ingredients={menu}
          ref={mainRef}
        />
      </div>
    </section>
  )
}

export default BurgerIngredients
