import type { AnyAction, Middleware, MiddlewareAPI } from 'redux'
import { getCookie } from '../../utils/cookie'
import { RootState, TWsMiddlewareActions } from '../../utils/types'

export const socketMiddleware = (wsUrl: string, wsActions: TWsMiddlewareActions): Middleware => {
  return (store: MiddlewareAPI<any, RootState>) => {
    let socket: WebSocket | null = null
    let token: string | undefined = undefined

    return (next) => async (action: AnyAction) => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, wsUserInit, onOpen, onError, onMessage, onClose } = wsActions
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`)
      } else if (type === wsUserInit) {
        token = getCookie('accessToken')
        if (token) {
          socket = new WebSocket(`${wsUrl}?token=${token.split(' ')[1]}`)
        } else {
          console.log('Token not found')
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen })
        }

        socket.onerror = (event) => {
          dispatch({ type: onError })
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          dispatch({ type: onMessage, payload: parsedData })
        }
        socket.onclose = (event) => {
          dispatch({ type: onClose })
        }
      }

      if (type === onClose) {
        socket?.close(1000, 'User close page')
      }

      next(action)
    }
  }
}
