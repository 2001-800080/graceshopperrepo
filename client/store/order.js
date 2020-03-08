import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import store from './index'

const MAKE_ORDER = 'MAKE_ORDER'

export const makeOrder = order => ({
  type: MAKE_ORDER,
  order
})

export const makeOrderThunk = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`api/cart`, order)
      dispatch(makeOrder(data))
    } catch (error) {
      next(error)
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
