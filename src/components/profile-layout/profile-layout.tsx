import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from '../../services/hooks'
import { logout } from '../../services/actions/user'

type TProfileLayoutProps = {
  children?: ReactNode
}

const ProfileLayout = ({ children }: TProfileLayoutProps) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="container pt-15">
      <div className="row mt-30">
        <div className="col">
          <NavLink to="/profile" activeClassName="active" className="link text text_type_main-medium">
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            activeClassName="active"
            className="link text text_color_inactive text_type_main-medium"
          >
            История заказов
          </NavLink>
          <button onClick={handleLogout} className="logout link text text_color_inactive text_type_main-medium">
            Выход
          </button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout
