import history from '../history'

const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DECREMENT_FROM_CART = 'DECREMENT_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

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
export const addToCart = bouquet => ({type: ADD_TO_CART, bouquet})
export const decrementFromCart = bouquet => ({
  type: DECREMENT_FROM_CART,
  bouquet
})
export const deleteFromCart = bouquet => ({type: DELETE_FROM_CART, bouquet})
export const clearCart = () => ({type: CLEAR_CART})

/**
 * REDUCER
 */

export default function(state = currentCart, action) {
  let bouquets, index
  switch (action.type) {
    case CLEAR_CART:
      localStorage.setItem('cart', [])
      return []
    case GET_CART:
      state = JSON.parse(localStorage.getItem('cart'))
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
      return bouquets

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

    default:
      return state
  }
}
