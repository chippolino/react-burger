import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../../services/hooks'
import { update } from '../../services/actions/user'
import ProfileLayout from '../../components/profile-layout/profile-layout'

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
  const { data, updateUserError } = useSelector((store) => store.user)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const initialData = {
    name: data?.name,
    email: data?.email,
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
    <ProfileLayout>
      <div className="col-2" ref={ref}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => handleChange(e)}
          value={formData.name || ''}
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
          value={formData.email || ''}
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
            <Button htmlType="button" type="secondary" size="medium" onClick={cancelChange}>
              Отмена
            </Button>
            <Button type="primary" size="medium" htmlType="button" onClick={handleSetChange}>
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </ProfileLayout>
  )
}
