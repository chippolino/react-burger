import React, { FC } from 'react'
import styles from './modal-overlay.module.scss'

type TModalOverlay = {
  handleClose: () => void
}

const ModalOverlay: FC<TModalOverlay> = (props) => {
  const { handleClose } = props

  return <div className={styles.overlay} onClick={handleClose} />
}

export default ModalOverlay
