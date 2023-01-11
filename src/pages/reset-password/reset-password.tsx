import React, { FormEvent, useState } from 'react'
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { resetPassword } from '../../utils/burger-api'

type TUseLocation = {
  resetDone: string
  from: string
}

export const ResetPassword = () => {
  const [tokenValue, setTokenValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const location = useLocation<TUseLocation>()
  const history = useHistory()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const data = {
      password: passwordValue,
      token: tokenValue
    }
    resetPassword(data).then((res) => {
      if (res.success) {
        history.replace({ pathname: '/login' })
      } else {
        console.error(res.message)
      }
    })
  }

  if (!location?.state?.resetDone) {
    return <Redirect to={location?.state?.from || '/'} />
  }

  return (
    <div className="container pt-15">
      <form className="loginBox mt-30" onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <div className="mt-6"></div>

        <div className="mt-6"></div>
        <PasswordInput
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={'password'}
        />
        <div className="mt-6"></div>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setTokenValue(e.target.value)}
          value={tokenValue}
          name={'token'}
          size={'default'}
        />
        <div className="mt-6"></div>
        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
        <div className="loginBox__flex mt-20">
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className="text text_type_main-default">
            Войти
          </Link>
        </div>
      </form>
    </div>
  )
}
