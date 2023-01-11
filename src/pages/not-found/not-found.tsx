import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="container pt-30">
      <div className="loginBox mt-30">
        <p className="text text_type_main-large">Страница не найдена</p>
        <p className="text text_type_main-medium mt-6">
          Перейти на <Link to="/">главную</Link>
        </p>
      </div>
    </div>
  )
}
