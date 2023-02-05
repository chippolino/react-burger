import styles from './order-feed.module.scss'
import { useEffect } from 'react'
import { WsConnectionClose, WsConnectionStart } from '../../services/actions/ws-actions'
import { useDispatch, useSelector } from '../../services/hooks'
import OrderItem from '../order-list/order-item/order-item'
import { PageLoaderIcon } from '../../images'
import { TOrder } from '../../services/types/data'

const OrderFeed = () => {
  const { data } = useSelector((store) => store.ws)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(WsConnectionStart())
    return () => {
      dispatch(WsConnectionClose())
    }
  }, [dispatch])

  const inProgress: TOrder[] | undefined = data?.orders.filter((item: { status: string }) => item.status === 'pending')
  const done: TOrder[] | undefined = data?.orders.filter((item: { status: string }) => item.status === 'done')

  return (
    <div className="container">
      <h1 className="text text_type_main-large pt-10">Лента заказов</h1>
      {!data ? (
        <div>
          <PageLoaderIcon width={100} height={100} />
        </div>
      ) : (
        <article className={styles.block}>
          <section className={`pt-5 customScrollbar ${styles.list}`}>
            {data.orders.map((item) => (
              <OrderItem order={item} key={crypto.randomUUID()} />
            ))}
          </section>
          <section className="pt-5">
            <div className={styles.flex}>
              <div>
                <p className="text text_type_main-medium">Готовы:</p>
                <ul className={`mt-6 ${styles.listOrder} customScrollbar`}>
                  {done?.map((item) => {
                    return (
                      <li className={`${styles.orderNumber} text text_type_digits-default`} key={crypto.randomUUID()}>
                        {item.number}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <p className="text text_type_main-medium">В работе:</p>
                <ul className={`mt-6 ${styles.listOrder} customScrollbar`}>
                  {inProgress?.map((item) => {
                    return (
                      <li className={`${styles.number} text text_type_digits-default`} key={crypto.randomUUID()}>
                        {item.number}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="mt-15">
              <p className="text text_type_main-medium">Выполнено за все время:</p>
              <span className={`text text_type_digits-large ${styles.number}`}>{data.total.toLocaleString('ru')}</span>
            </div>
            <div className="mt-15">
              <p className="text text_type_main-medium">Выполнено за сегодня:</p>
              <span className={`text text_type_digits-large ${styles.number}`}>
                {data.totalToday.toLocaleString('ru')}
              </span>
            </div>
          </section>
        </article>
      )}
    </div>
  )
}

export default OrderFeed
