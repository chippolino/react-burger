import styles from './order-item.module.scss'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TOrder } from '../../../services/types/data'
import { useSelector } from '../../../services/hooks'
import { Link, useLocation } from 'react-router-dom'
import { formattedDate } from '../../../utils/formatted-date'

type TOrderProps = {
  order: TOrder
  orderUser?: boolean
}

const OrderItem = (props: TOrderProps) => {
  const location = useLocation()
  const { menu } = useSelector((store) => store.ingredients)
  const { order } = props
  const ingredients = order.ingredients.map((value) => menu.find((item) => item._id === value))
  const total = ingredients.reduce((acc, curr) => {
    if (curr !== undefined) {
      return curr.type === 'bun' ? acc + curr.price * 2 : acc + curr.price
    }
    return 0
  }, 0)

  const date = formattedDate(order.createdAt)

  const countIng = ingredients.length > 6 ? ingredients.length - 6 : 0

  const link = (props.orderUser ? 'orders/' : 'feed/') + order._id

  const status =
    order?.status === 'done'
      ? 'Выполнен'
      : order?.status === 'pending'
      ? 'Готовиться'
      : order?.status === 'created'
      ? 'Создан'
      : ''

  return (
    <Link
      to={{
        pathname: link,
        state: { background: location }
      }}
      className={`${styles.root} p-6`}
    >
      <div className={`${styles.flex}`}>
        <p className="text text_type_main-medium">#{order.number}</p>
        <p className={`text text_type_main-default ${styles.time}`}>{date}</p>
      </div>
      <p className="text text_type_main-medium mt-6">{order.name}</p>
      {props.orderUser ? (
        <p className={`text text_type_main-default mt-2 ${order?.status === 'done' ? styles.done : ''}`}>{status}</p>
      ) : null}
      <div className={`${styles.flex} mt-6`}>
        <div className={styles.images}>
          {ingredients.slice(0, 6).map((item, index) => (
            <div
              key={crypto.randomUUID()}
              className={`${styles.image} ${countIng > 0 && index === 5 ? styles.last : ''}`}
              data-count={countIng}
            >
              <img src={item?.image_mobile} alt={item?.name} />
            </div>
          ))}
        </div>
        <p className={`text text_type_digits-default ${styles.total}`}>
          {total} <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  )
}

export default OrderItem
