export const ingredient = {
  _id: '62d6923442d34a001c279d2d',
  name: 'Краторная булка N-200i',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  __v: 0,
  uniqueId: '62d6923442d34a001c279d2d',
  title: 'Краторная булка N-200i'
}

export const ingredients = {
  data: [ingredient, ingredient],
  success: true
}

export const orderDetails = {
  createdAt: '2022-07-19T11:15:00.069Z',
  ingredients: ['62d6923442d34a001c279d2d', '62d6923442d34a001c279d2d'],
  name: 'Space краторный бургер',
  number: 20295,
  status: 'done',
  updatedAt: '2022-07-19T11:15:00.069Z',
  _id: '62d6923442d34a001c279d2d'
}

export const ordersSocket = {
  success: true,
  orders: [orderDetails, orderDetails],
  total: 20523,
  totalToday: 732
}

export const user = {
  email: 'user@mail.ru',
  name: 'User',
  password: 'qwerty'
}

export const userError = {
  message: 'error',
  success: false
}

export const order = {
  name: 'Space флюоресцентный бургер',
  order: {
    createdAt: '2022-07-19T15:24:15.681Z',
    ingredients: [{ _id: '60d3b41abdacab0026a733c7', name: 'Флюоресцентная булка R2-D3', type: 'bun', proteins: 44 }],
    name: 'Space флюоресцентный бургер',
    number: 20632,
    owner: { name: 'ADMIN', email: 'ogurcov.artem2012@list.ru', createdAt: '2022-06-12T13:15:42.437Z' },
    price: 2056,
    status: 'done',
    updatedAt: '2022-07-19T15:24:16.273Z',
    _id: '62d6923442d34a001c279d2d'
  },
  success: true
}
