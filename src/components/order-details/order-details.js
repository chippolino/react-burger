import styles from './order-details.module.scss'
import DoneImage from '../../images/done.png'
import { useSelector } from 'react-redux'

const OrderDetails = () => {
  const { order } = useSelector((state) => state.orderDetails.orderDetails)
  return (
    <div className={styles.root}>
      <p className={`text text_type_main-large ${styles.textDetails}`}></p>
      <p className={`text text_type_digits-large mt-4 ${styles.orderNumber}`}>
        {order.number}
      </p>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
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
  )
}

export default OrderDetails
