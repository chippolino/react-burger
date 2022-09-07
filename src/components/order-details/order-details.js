import Modal from '../modal/modal'
import styles from './order-details.module.scss'
import DoneImage from '../../images/done.png'
import PropTypes from 'prop-types'

const OrderDetails = (props) => {
  const { handleClose, isOpen } = props
  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className={styles.root}>
        <p className={`text text_type_main-large ${styles.textDetails}`}></p>
        <p className={`text text_type_digits-large mt-4 ${styles.orderNumber}`}>
          034536
        </p>
        <p className={`text text_type_main-medium mt-8`}>
          идентификатор заказа
        </p>
        <img
          src={DoneImage}
          alt="Картинка галочки"
          className="mt-15"
          width={120}
          height={120}
        />
        <p className="text text_type_main-default mt-15">
          Ваш заказ начали готовить
        </p>
        <p
          className={`text text_type_main-default mt-2 mb-15 ${styles.smallText}`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  )
}

OrderDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default OrderDetails
