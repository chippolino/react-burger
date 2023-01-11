import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../services/actions/user'
import { ReactComponent as LoaderIcon } from '../../images/loader.svg'

const initialFormData = {
  email: '',
  password: '',
  name: ''
}

export const Register = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialFormData)
  const { registerUserRequest, registerUserError, registerUserFailed } =
    useSelector((store: any) => store.user)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(register(formData))
  }

  return (
    <div className="container pt-15">
      <form onSubmit={handleSubmit} className="loginBox mt-30">
        <legend className="text text_type_main-medium">Регистрация</legend>
        <div className="mt-6"></div>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={formData.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          required
        />
        <div className="mt-6"></div>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
          value={formData.email}
          name={'email'}
          error={false}
          errorText={'Введите корректный email'}
          size={'default'}
          required
        />
        <div className="mt-6"></div>
        <PasswordInput
          onChange={handleChange}
          value={formData.password}
          name={'password'}
          required
        />
        <div className={`mt-6 ${registerUserFailed && 'mb-6'}`}>
          {registerUserFailed && (
            <p className="text text_type_main-small text_color_error">
              {registerUserError}
            </p>
          )}
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={registerUserRequest}
        >
          {registerUserRequest ? <LoaderIcon /> : 'Зарегистрироваться'}
        </Button>
      </form>

      <div className="loginBox__flex mt-20">
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link to="/login" className="text text_type_main-default">
          Войти
        </Link>
      </div>
    </div>
  )
}
