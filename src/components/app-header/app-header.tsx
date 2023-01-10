import React from 'react'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.scss'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppHeader = () => {
  const isConstructor = !!useRouteMatch({ path: '/', exact: true })
  const isFeed = !!useRouteMatch('/feed')
  const isProfile = !!useRouteMatch('/profile')
  const user = useSelector((state: any) => state.user.data)

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <div className="container">
        <nav className={styles.menu}>
          <span className={styles.menuLeft}>
            <NavLink
              exact
              to="/"
              className={`text text_type_main-default pt-4 pb-4 pl-5 pr-5 ${styles.link}`}
              activeClassName={styles.active}
            >
              <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
              Конструктор
            </NavLink>
            <NavLink
              to="/feed"
              className={`text text_type_main-default pt-4 pb-4 pl-5 pr-5 ${styles.link}`}
              activeClassName={styles.active}
            >
              <ListIcon type={isFeed ? 'primary' : 'secondary'} />
              Лента заказов
            </NavLink>
          </span>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <NavLink
            to="/profile"
            className={`text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5 ${styles.link} ${styles.menuRight}`}
            activeClassName={styles.active}
          >
            <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
            {user ? user.name : 'Личный кабинет'}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
