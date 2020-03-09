import axios from 'axios'

const MAKE_ORDER = 'MAKE_ORDER'

export const makeOrder = order => ({
  type: MAKE_ORDER,
  order
})

export const makeOrderCheckoutThunk = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`api/cart/checkout`, order)
      dispatch(makeOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const makeOrderLogoutThunk = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`api/cart/logout`, order)
      dispatch(makeOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(order = {}, action) {
  switch (action.type) {
    case MAKE_ORDER:
      return action.order
    default:
      return order
  }
}
