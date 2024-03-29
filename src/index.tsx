import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/_global.scss'
import App from './components/app/app'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { store } from './services/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
