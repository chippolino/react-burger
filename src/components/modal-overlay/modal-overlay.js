import React from 'react'
import styles from './modal-overlay.module.scss'
import PropTypes from 'prop-types'

const ModalOverlay = (props) => {
  const { handleClose } = props

  return <div className={styles.overlay} onClick={handleClose} />
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default ModalOverlay
