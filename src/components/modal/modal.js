import Portal from '../portal/portal'
import styles from './modal.module.scss'
import { useEffect } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = (props) => {
  const { children, isOpen, handleClose } = props

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  if (!isOpen) return null

  return (
    <Portal wrapperId="modal-container">
      <div className={`${styles.modal} ${isOpen && styles.active}`}>
        <div className={styles.overlay} onClick={handleClose} />
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

export default Modal
