// import axios from 'axios'
// import history from '../history'

// const initialstate = {
//     bouquet = [],
//     total: 0
// }

//Action Type
const GET_BOUQUETS = 'GET_BOUQUETS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'

export const getBouquets = () => ({
  type: GET_BOUQUETS
})

export const addToCart = bouquet => ({
  type: ADD_TO_CART,
  bouquet
})

export const removeFromCart = bouquet => ({
  type: REMOVE_FROM_CART,
  bouquet
})

export const emptyCart = () => ({
  type: EMPTY_CART
})
