import React from 'react'
import styles from './burger-constructor.module.scss'
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ReactComponent as LoaderIcon } from '../../images/loader.svg'
import OrderDetails from '../order-details/order-details'
import Ingredient from './ingredient/ingredient'
import useModal from '../../hooks/use-modal'
import Modal from '../modal/modal'
import { useDispatch, useSelector } from '../../services/hooks'
import { isOrderAvailable, totalCartSelector } from '../../services/selectors'
import { useDrop } from 'react-dnd'
import { sendOrder } from '../../services/actions/order-details'
import { useHistory } from 'react-router-dom'
import { TIngredientPropTypes } from '../../utils/types'

const BurgerConstructor = () => {
  const { isOpen, handleOpen, handleClose } = useModal()
  const dispatch = useDispatch()
  const { items, bun } = useSelector((store) => store.burgerConstructor)
  const user = useSelector((state) => state.user.data)
  const { orderDetails, orderDetailsRequest, orderDetailsFailed } = useSelector((store) => store.orderDetails)
  const history = useHistory()

  const total = useSelector(totalCartSelector)

  const isOrder = useSelector(isOrderAvailable)

  const handleSendOrder = () => {
    if (user) {
      const orderArray = [bun._id, items.map((i: TIngredientPropTypes) => i._id), bun._id]

      dispatch(sendOrder(orderArray))
      handleOpen()
    } else {
      history.replace({ pathname: '/login' })
    }
  }

  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop() {
      return { name: 'dropped' }
    }
  })

  const isActive = canDrop && isOver

  const bunNotEmpty = Object.keys(bun).length > 0

  const [, drop] = useDrop(() => ({ accept: 'drop' }))
  return (
    <section className="pt-25">
      <ul className={styles.listBurger} ref={dropTarget}>
        <li className={`${styles.itemBurger} ${canDrop && styles.canDrop} ${isActive && styles.isActive}`}>
          {bunNotEmpty && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (вверх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </li>

        <ul
          className={`customScrollbar ${styles.listIngredients} ${canDrop && styles.canDrop} ${
            isActive && styles.isActive
          }`}
          ref={drop}
        >
          {items.map((i: TIngredientPropTypes) => {
            return <Ingredient ingredient={i} key={i.uniqueId} />
          })}
        </ul>

        <li
          className={`${styles.itemBurger} ${styles.listBottomBurger} ${canDrop && styles.canDrop} ${
            isActive && styles.isActive
          }`}
          ref={dropTarget}
        >
          {bunNotEmpty && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </li>
      </ul>
      <div className={`mt-10 ${styles.totalWrap}`}>
        <span className={`text text_type_digits-medium ${styles.total}`}>
          {total}
          <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="button" type="primary" size="large" onClick={() => handleSendOrder()} disabled={!isOrder}>
          {orderDetailsRequest ? <LoaderIcon /> : 'Оформить заказ'}
        </Button>
      </div>
      {orderDetailsFailed && (
        <p className={`text text_type_main-small mt-1 ${styles.error}`}>
          Произошла ошибка при оформлении заказа, попробуйте чуть позже
        </p>
      )}

      {!orderDetailsRequest && !orderDetailsFailed && Object.keys(orderDetails).length > 0 && (
        <Modal isOpen={isOpen} handleClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor
