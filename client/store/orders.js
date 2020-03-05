import axios from 'axios'
// import history from '../history'

const initialState = []

//Action Type
const GET_USER_ORDER = 'GET_USER_ORDER'

//Action Creator
const getUserOrders = order => ({
  type: GET_USER_ORDER,
  order
})

//Thunk

export const userOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/order`)
      dispatch(getUserOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDER:
      return action.order
    default:
      return state
  }
}
