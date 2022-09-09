import React from 'react'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.scss'

const AppHeader = () => {
  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <div className="container">
        <nav className={styles.menu}>
          <span className={styles.menuLeft}>
            <p
              className={`text text_type_main-default pt-4 pb-4 pl-5 pr-5 ${styles.link}`}
            >
              <BurgerIcon type="primary" />
              Конструктор
            </p>
            <p
              className={`text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5 ${styles.link}`}
            >
              <ListIcon type="secondary" />
              Лента заказов
            </p>
          </span>
          <Logo />
          <p
            className={`text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5 ${styles.link} ${styles.menuRight}`}
          >
            <ProfileIcon type="secondary" />
            Личный кабинет
          </p>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
