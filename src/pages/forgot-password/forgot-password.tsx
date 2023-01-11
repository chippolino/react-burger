import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory, useLocation } from 'react-router-dom'
import React, { FormEvent, useState } from 'react'
import { forgotPassword } from '../../utils/burger-api'

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('')
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const data = {
      email: emailValue
    }
    forgotPassword(data).then((res) => {
      if (res.success) {
        history.replace({
          pathname: '/reset-password',
          state: { resetDone: location }
        })
      } else {
        console.log(res.message)
      }
    })
  }

  return (
    <div className="container pt-15">
      <form className="loginBox mt-30" onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <div className="mt-6"></div>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

        <div className="mt-6"></div>
        <Button type="primary" size="medium" htmlType="submit">
          Восстановить
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
