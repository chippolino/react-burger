import { Redirect, Route, useLocation } from 'react-router-dom'

import { ReactComponent as Loader } from '../../images/page-loader.svg'
import { FC, ReactNode } from 'react'
import { useSelector } from '../../services/hooks'

type TLocationState = {
  from: {
    pathname: string
  }
}

type TProtectedRoute = {
  onlyUnAuth?: boolean
  children: ReactNode
  path?: string
  exact?: boolean
}

export const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth = false, children, ...rest }) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked)
  const user = useSelector((state) => state.user.data)
  const location = useLocation<TLocationState>()

  if (!isAuthChecked) {
    return <Loader width={100} height={100} />
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }

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
