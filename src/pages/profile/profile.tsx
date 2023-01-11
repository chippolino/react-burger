import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, update } from '../../services/actions/user'

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current?.contains(event.target as HTMLElement)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}

export const Profile = () => {
  const { data, updateUserError } = useSelector((store: any) => store.user)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const initialData = {
    name: data.name,
    email: data.email,
    password: ''
  }

  const disabledData = {
    name: true,
    email: true,
    password: true
  }

  const [disabled, setDisabled] = useState(disabledData)
  const [formData, setFormData] = useState(initialData)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    // @ts-ignore
    dispatch(logout())
  }

  const onIconClick = (current: string) => {
    switch (current) {
      case 'name': {
        setDisabled({ ...disabled, name: !disabled.name })
        setTimeout(() => nameRef.current?.focus(), 0)
        break
      }
      case 'email': {
        setDisabled({ ...disabled, email: !disabled.email })
        setTimeout(() => emailRef.current?.focus(), 0)
        break
      }
      case 'password': {
        setDisabled({ ...disabled, password: !disabled.password })
        setTimeout(() => passwordRef.current?.focus(), 0)
        break
      }
      default: {
        return null
      }
    }
  }

  const handleClickOutside = () => {
    setDisabled(disabledData)
  }

  const ref = useOutsideClick(handleClickOutside)

  const cancelChange = () => {
    setFormData(initialData)
  }

  const handleSetChange = () => {
    setDisabled(disabledData)
    let data = {}
    if (initialData.name !== formData.name) {
      data = { ...data, name: formData.name }
    }
    if (initialData.email !== formData.email) {
      data = { ...data, email: formData.email }
    }
    if (initialData.password !== formData.password) {
      data = { ...data, password: formData.password }
    }

    // @ts-ignore
    dispatch(update(data))
    if (updateUserError) {
      cancelChange()
    }
  }

  const checkChangeFormData =
    initialData.name !== formData.name ||
    initialData.password !== formData.password ||
    initialData.email !== formData.email

  return (
    <div className="container pt-15">
      <div className="row mt-30">
        <div className="col">
          <NavLink
            to="/profile"
            activeClassName="active"
            className="link text text_type_main-medium"
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className="link text text_color_inactive text_type_main-medium"
          >
            История заказов
          </NavLink>
          <button
            onClick={handleLogout}
            className="logout link text text_color_inactive text_type_main-medium"
          >
            Выход
          </button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className="col-2" ref={ref}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => handleChange(e)}
            value={formData.name}
            name={'name'}
            size={'default'}
            icon={disabled.name ? 'EditIcon' : 'CloseIcon'}
            ref={nameRef}
            onIconClick={() => onIconClick('name')}
            disabled={disabled.name}
          />
          <div className="mt-6"></div>
          <Input
            type={'text'}
            placeholder="Логин"
            onChange={(e) => handleChange(e)}
            value={formData.email}
            name={'email'}
            ref={emailRef}
            icon={disabled.email ? 'EditIcon' : 'CloseIcon'}
            onIconClick={() => onIconClick('email')}
            disabled={disabled.email}
          />
          <div className="mt-6"></div>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={(e) => handleChange(e)}
            value={formData.password}
            name={'password'}
            icon={disabled.password ? 'EditIcon' : 'CloseIcon'}
            ref={passwordRef}
            onIconClick={() => onIconClick('password')}
            disabled={disabled.password}
          />
          {checkChangeFormData && (
            <div className="wrapBtn mt-6">
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={cancelChange}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="medium"
                htmlType="button"
                onClick={handleSetChange}
              >
                Сохранить
              </Button>
            </div>
          )}
          {updateUserError && (
            <p className="text text_type_main-default text_color_error mt-4">
              {updateUserError.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
