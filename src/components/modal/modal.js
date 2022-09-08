import Portal from '../portal/portal'
import styles from './modal.module.scss'
import { useEffect } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
import PropTypes from 'prop-types'

const KEY_NAME_ESC = 'Escape'
const KEY_EVENT_TYPE = 'keydown'

const Modal = (props) => {
  const { children, isOpen, handleClose } = props

  useEffect(() => {
    function closeOnEscapeKey(e) {
      return e.key === KEY_NAME_ESC ? handleClose() : null
    }
    document.body.addEventListener(KEY_EVENT_TYPE, closeOnEscapeKey)

    return () => {
      document.body.removeEventListener(KEY_EVENT_TYPE, closeOnEscapeKey)
    }
  }, [handleClose])

  if (!isOpen) return null

  return (
    <Portal wrapperId="modal-container">
      <div className={`${styles.modal} ${isOpen && styles.active}`}>
        <ModalOverlay handleClose={handleClose} />
        <div className={styles.modalContent}>
          <button onClick={handleClose} className={styles.closeButton}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default Modal
