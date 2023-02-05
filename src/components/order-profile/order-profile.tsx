import { useEffect } from 'react'
import styles from './order-profile.module.scss'
import { WsConnectionClose, WsConnectionUserStart } from '../../services/actions/ws-actions'
import { useDispatch, useSelector } from '../../services/hooks'
import ProfileLayout from '../profile-layout/profile-layout'
import OrderItem from '../order-list/order-item/order-item'
import { LoaderIcon } from '../../images'

const OrderProfile = () => {
  const { data } = useSelector((store) => store.ws)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(WsConnectionUserStart())
    return () => {
      dispatch(WsConnectionClose())
    }
  }, [dispatch])

  return (
    <ProfileLayout>
      {!data ? (
        <LoaderIcon />
      ) : (
        <div className={`customScrollbar ${styles.list}`}>
          {data.orders.map((item) => (
            <OrderItem orderUser order={item} key={crypto.randomUUID()} />
          ))}
        </div>
      )}
    </ProfileLayout>
  )
}

export default OrderProfile
