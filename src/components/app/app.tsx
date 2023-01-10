import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import {
  ForgotPassword,
  Login,
  Main,
  NotFound,
  Profile,
  Register,
  ResetPassword
} from '../../pages/'
import { PageLayout } from '../page-layout/page-layout'
import { useDispatch } from 'react-redux'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import { getMenu } from '../../services/actions/ingredients'
import { ProtectedRoute } from '../protected-route/protected-route'
import { checkUserAuth } from '../../services/actions/user'

type TLocationState = {
  background: any
}

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation<TLocationState>()

  useEffect(() => {
    // @ts-ignore
    dispatch(getMenu())

    // @ts-ignore
    dispatch(checkUserAuth())
  }, [dispatch])

  const background = location.state && location.state.background

  const handleModalClose = () => history.goBack()

  return (
    <PageLayout>
      <Switch location={background || location}>
        <ProtectedRoute onlyUnAuth={true} path="/login">
          <Login />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/register" exact>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact>
          <ResetPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <div className="mt-30">
            <IngredientDetails />
          </div>
        </Route>
        <Route exact={true} path="/">
          <Main />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <>
          <Route path="/ingredients/:id" exact>
            <Modal isOpen={true} handleClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          </Route>
        </>
      )}
    </PageLayout>
  )
}

export default App
