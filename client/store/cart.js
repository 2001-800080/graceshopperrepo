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
// const cart = JSON.parse(localStorage.getItem('cart'))

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
        state = [] //i dont think we need this.
      }
      return state
    case ADD_TO_CART:
      // search state to find if id is already there
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) {
        // if its there
        bouquets = state

        if (bouquets[index].quantity + 1 <= bouquets[index].bouquet.quantity) {
          bouquets[index].quantity += 1
        } else if (
          bouquets[index].quantity + 1 >
          bouquets[index].bouquet.quantity
        ) {
          console.error('Sold Out')
          //turn this into an alert?
        }
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
      return [...bouquets]

    case DECREMENT_FROM_CART:
      // search state to find if id is already there
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) bouquets = state
      // if its there decrease by 1 or delete if quantity is already 1

      if (bouquets[index].quantity > 1) bouquets[index].quantity -= 1
      else bouquets.splice(index, 1)
      //look at what this splice is doing//

      localStorage.setItem('cart', JSON.stringify(bouquets))
      return [...bouquets]

    case DELETE_FROM_CART:
      index = state.findIndex(el => el.id === action.bouquet.id)
      if (index > -1) {
        bouquets = state
        bouquets.splice(index, 1)
        //look at what this splice is doing//
      }
      localStorage.setItem('cart', JSON.stringify(bouquets))
      return [...bouquets]
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
