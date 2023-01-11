import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

type TPortal = {
  children: React.ReactNode
  wrapperId: string
}

function Portal({ children, wrapperId = 'modal-wrapper' }: TPortal) {
  const [wrapperElement, setWrapperElement] = useState(
    document.getElementById(wrapperId)
  )

  useLayoutEffect(() => {
    function initial() {
      const element = document.getElementById(wrapperId)
        ? document.getElementById(wrapperId)
        : createWrapperAndAppendToBody(wrapperId)

      setWrapperElement(element)

      return () => {
        if (element?.parentNode) {
          element?.parentNode.removeChild(element)
        }
      }
    }

    initial()
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

export default Portal
