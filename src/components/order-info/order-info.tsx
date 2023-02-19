import styles from './order-info.module.scss'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../../services/hooks'
import { useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { WsConnectionClose, WsConnectionStart, WsConnectionUserStart } from '../../services/actions/ws-actions'
import { formattedDate } from '../../utils/formatted-date'
import { PageLoaderIcon } from '../../images'

type TOrderInfoProps = {
  center?: boolean
}

const OrderInfo = (props: TOrderInfoProps) => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.ws)
  const { menu } = useSelector((store) => store.ingredients)
  const { path } = useRouteMatch()
  const { id } = useParams<{ id: string }>()

  const location: { state: { background: unknown } } = useLocation()

  useEffect(() => {
    if (!location.state?.background) {
      if (path === '/profile/orders/:id') {
        dispatch(WsConnectionUserStart())
      } else {
        dispatch(WsConnectionStart())
      }

      return () => {
        dispatch(WsConnectionClose())
      }
    }
  }, [dispatch, location, path])

  if (!data) {
    return (
      <div className={styles.center}>
        <PageLoaderIcon width={100} height={100} />
      </div>
    )
  }

  const order = data.orders.find((item) => item._id === id)
  const date = formattedDate(order?.createdAt)
  const ingredients = order?.ingredients.map((value) => menu.find((item) => item._id === value))
  const total = ingredients?.reduce((acc, curr) => {
    if (curr !== undefined) {
      return curr.type === 'bun' ? acc + curr.price * 2 : acc + curr.price
    }
    return 0
  }, 0)

  const status =
    order?.status === 'done'
      ? 'Выполнен'
      : order?.status === 'pending'
      ? 'Готовиться'
      : order?.status === 'created'
      ? 'Создан'
      : ''

  return (
    <div className={styles.root}>
      <p className={`${styles.textDetails} ${props.center ? styles.center : ''} text text_type_digits-default`}>
        #{order?.number}
      </p>
      <p className={`text text_type_main-medium mt-5`}>{order?.name}</p>
      <p className={`text mt-2 text_type_main-default ${order?.status === 'done' ? styles.done : ''}`}>{status}</p>
      <p className={`text text_type_main-medium mt-15`}>Состав:</p>
      <ul className={`customScrollbar mt-6 ${styles.list}`}>
        {ingredients?.map((item) => (
          <li className={`${styles.item}`} key={crypto.randomUUID()}>
            <div className={styles.image}>
              <img src={item?.image_mobile} alt={item?.name} />
            </div>
            <p className={`text text_type_main-default`}>{item?.name}</p>
            <p className={`text text_type_digits-default ${styles.total}`}>
              {item?.type === 'bun' ? 2 : 1} x {item?.price} <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>
      <div className={`${styles.bot} mt-5`}>
        <p className={`text text_type_main-default ${styles.time}`}>{date}</p>
        <p className={`text text_type_digits-default ${styles.total}`}>
          {total} <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  )
}

export default OrderInfo
