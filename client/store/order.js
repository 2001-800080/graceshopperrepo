import axios from 'axios'

const MAKE_ORDER = 'MAKE_ORDER'

export const makeOrder = order => ({
  type: MAKE_ORDER,
  order
})

export const makeOrderCheckoutThunk = (order, token) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`api/cart/checkout`, {order, token})
      dispatch(makeOrder(data))
      if (status === 'success') {
        toast('Success! Check email for details', {type: 'success'})
      } else {
        toast('Something went wrong', {type: 'error'})
      }
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
