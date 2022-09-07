import { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

function Portal({ children, wrapperId = 'modal-wrapper' }) {
  const [wrapperElement, setWrapperElement] = useState(
    document.getElementById(wrapperId)
  )

  function initial() {
    const element = document.getElementById(wrapperId)
      ? document.getElementById(wrapperId)
      : createWrapperAndAppendToBody(wrapperId)

    setWrapperElement(element)

    return () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }

  useLayoutEffect(() => {
    initial()
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

export default Portal
