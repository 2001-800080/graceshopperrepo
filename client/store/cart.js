import history from '../history'
import thunkMiddleware from 'redux-thunk'
import store from './index'
import axios from 'axios'

const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DECREMENT_FROM_CART = 'DECREMENT_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */
let currentCart = []

// cart is going to be an array of objects
// keys:
//    id (integer)
//    bouquet (object)
//    quantity (integer)

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
      const {data} = await axios.get(`/api/cart/${email}`)
      dispatch(setCart(data))
      console.log('insetdata', data)
      if (data) window.localStorage.setItem('cart', JSON.stringify(data))
      dispatch(getCart())
      history.push('/home')
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
      const local = JSON.parse(localStorage.getItem('cart'))
      if (local) {
        state = local
        console.log('state in getCart: ', state)
      } else {
        state = []
      }
      return state
    case ADD_TO_CART:
      // search state to find if id is already there
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) {
        // if its there add 1
        bouquets = state
        bouquets[index].quantity += 1
        // if not there concat
      } else {
        bouquets = state.concat([
          {
            id: action.bouquet.id,
            bouquet: action.bouquet,
            quantity: 1
          }
        ])
      }
      localStorage.setItem('cart', JSON.stringify(bouquets))
      return [...bouquets] //you have to clone the state so that the parts of the state (our cart here) that are changing actually get read in the way that causes a re-render. React isn't going to waste time un-nesting deeply nested things to see if something change bc that's a costly operation. Since our cart is deeply nested, if we didn't use spread operator, the pointers to reference in memory of our flower objects currently in the cart would have stayed the same. We can only re-render TinyCart's number if the props can register that something changed. And props only get shallow comparison. So we had to make this part of the reducer send a clone of the state of our cart, making TinyCart able to get re-rendered upon adding things to cart - uniquely or repetetively

    case DECREMENT_FROM_CART:
      // search state to find if id is already there
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) bouquets = state
      // if its there decrease by 1 or delete if quantity is already 1

      if (bouquets[index].quantity > 1) bouquets[index].quantity -= 1
      else bouquets.splice(index, 1)

      localStorage.setItem('cart', JSON.stringify(bouquets))
      return bouquets

    case DELETE_FROM_CART:
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) {
        bouquets = state
        bouquets.splice(index, 1)
      }
      localStorage.setItem('cart', JSON.stringify(bouquets))
      return bouquets
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
