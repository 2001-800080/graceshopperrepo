import axios from 'axios'
import userState from './user'

const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
const DECREMENT_FROM_CART = 'DECREMENT_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */
let currentCart = []

/**
 * ACTION CREATORS
 */
export const getCart = () => ({type: GET_CART})
export const setCart = cart => ({type: SET_CART, cart})
export const addToCart = bouquet => ({type: ADD_TO_CART, bouquet})
export const decrementFromCart = bouquet => ({
  type: DECREMENT_FROM_CART,
  bouquet
})
export const deleteFromCart = bouquet => ({type: DELETE_FROM_CART, bouquet})
export const clearCart = () => ({type: CLEAR_CART})

//THUNKS
export const setCartThunk = email => {
  return async dispatch => {
    try {
      console.log('test')
      console.log(userState)
      const {data} = await axios.get(`/api/cart/${email}`)
      if (data) {
        window.localStorage.setItem('cart', JSON.stringify(data))
        dispatch(setCart(data))
        dispatch(getCart())
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateCartThunk = (action, item, user) => {
  return async dispatch => {
    try {
      console.log('in thunk bouq', item)
      if (!user.id) {
        dispatch(action(item))
      } else if (user) {
        await axios.put('/api/cart/update', {
          action: String(action().type),
          item: item
        })
        dispatch(action(item))
      }
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * REDUCER
 */

export default function(state = currentCart, action) {
  let bouquets, index
  switch (action.type) {
    case CLEAR_CART:
      localStorage.setItem('cart', ['0'])
      return []
    case GET_CART:
      if (JSON.parse(localStorage.getItem('cart') === 'undefined')) {
        localStorage.setItem('cart', ['0'])
      }
      const local = JSON.parse(localStorage.getItem('cart'))
      if (local) {
        state = local
      } else {
        state = []
      }
      return state
    case ADD_TO_CART:
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) {
        console.log('in first if')
        bouquets = state
        console.log(bouquets[index].bouquet.quantity, 'bouq quant')
        if (bouquets[index].quantity + 1 <= bouquets[index].bouquet.quantity) {
          console.log('in sedcond if')
          bouquets[index].quantity += 1
        } else if (
          bouquets[index].quantity + 1 >
          bouquets[index].bouquet.quantity
        ) {
          console.log('in the elseif')
          window.alert(
            'Oops! This product is currently sold out 💸\n But feel free to browse our other lovely bouquets 💐 \n If you have a special request please call us at 1-800-VIOLETV 📞'
          )
        }
      } else {
        console.log('in the else')
        bouquets = state.concat([
          {
            id: action.bouquet.id,
            bouquet: action.bouquet,
            quantity: 1
          }
        ])
      }
      localStorage.setItem('cart', JSON.stringify(bouquets))
      return [...bouquets]

    case DECREMENT_FROM_CART:
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) bouquets = state
      if (bouquets[index].quantity > 1) bouquets[index].quantity -= 1
      else bouquets.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(bouquets))
      return [...bouquets]

    case DELETE_FROM_CART:
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) {
        bouquets = state
        bouquets.splice(index, 1)
      }
      localStorage.setItem('cart', JSON.stringify(bouquets))
      return [...bouquets]
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
