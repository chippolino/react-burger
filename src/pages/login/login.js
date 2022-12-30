import React, { useState } from 'react'
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/actions/user'
import { ReactComponent as LoaderIcon } from '../../images/loader.svg'

export const Login = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const { loginUserRequest } = useSelector((store) => store.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: emailValue,
      password: passwordValue
    }
    dispatch(login(data))
  }

  return (
    <div className="container pt-15">
      <form className="loginBox mt-30">
        <p className="text text_type_main-medium">Вход</p>
        <div className="mt-6"></div>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          size={'default'}
          required
        />
        <div className="mt-6"></div>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={(e) => setPasswordValue(e.target.value)}
          icon={showPassword ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setShowPassword(!showPassword)}
          value={passwordValue}
          name={'password'}
          required
        />
        <div className="mt-6"></div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleSubmit}
          disabled={loginUserRequest}
        >
          {loginUserRequest ? <LoaderIcon /> : 'Войти'}
        </Button>

        <div className="loginBox__flex mt-20">
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link to="/register" className="text text_type_main-default">
            Зарегистрироваться
          </Link>
        </div>
        <div className="loginBox__flex mt-4">
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className="text text_type_main-default">
            Восстановить пароль
          </Link>
        </div>
      </form>
    </div>
  )
}
