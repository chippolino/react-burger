import { useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { ReactComponent as Loader } from '../../images/page-loader.svg'

export const ProtectedRoute = ({ onlyUnAuth = false, children, ...rest }) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked)
  const user = useSelector((state) => state.user.data)
  const location = useLocation()

  if (!isAuthChecked) {
    return <Loader width={100} height={100} />
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { form: { pathname: '/' } }

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    )
  }

  if (!onlyUnAuth && !user) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    )
  }

  return <Route {...rest}>{children}</Route>
}
