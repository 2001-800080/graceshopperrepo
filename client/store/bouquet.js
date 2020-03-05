import axios from 'axios'
// import history from '../history'
// import thunkMiddleware from 'redux-thunk'
// import store from './index'

const defaultBouquets = {
  bouquets: [],
  bouquet: []
}

//Action Types for  BOUQUETS ONLY
const GOT_ALL_BOUQUETS = 'GOT_ALL_BOUQUETS'
const GOT_SINGLE_BOUQUET = 'GOT_SINGLE_BOUQUET'
const DELETE_BOUQUET = 'DELETE_BOUQUET'
const ADD_BOUQUET = 'ADD_BOUQUET'

//ACTION Creator

export const gotAllBouquets = bouquets => ({
  type: GOT_ALL_BOUQUETS,
  bouquets
})

export const gotSingleBouquet = bouquet => ({
  type: GOT_SINGLE_BOUQUET,
  bouquet
})

export const deleteBouquet = bouquetId => ({
  type: DELETE_BOUQUET,
  bouquetId
})

//Admin to add
export const createBouquet = bouquet => ({
  type: ADD_BOUQUET,
  bouquet
})

//THUNKS
export const getAllBouquets = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/bouquets')
      dispatch(gotAllBouquets(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getSingleBouquet = bouquetId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/bouquets/${bouquetId}`)
      dispatch(gotSingleBouquet(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteBouquetItem = bouquetId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/bouquets/${bouquetId}`)
      dispatch(deleteBouquet(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addBouquetItem = bouquet => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/bouquets', bouquet)
      dispatch(createBouquet(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateSingleBouquet = (bouquetId, bouquet) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/bouquets/${bouquetId}`, bouquet)
      dispatch(gotSingleBouquet(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = defaultBouquets, action) {
  switch (action.type) {
    case GOT_ALL_BOUQUETS:
      return {...state, bouquets: action.bouquets}

    case GOT_SINGLE_BOUQUET:
      return {...state, bouquet: action.bouquet}

    case DELETE_BOUQUET:
      return {
        ...state,
        bouquets: state.bouquets.filter(
          bouquet => bouquet.id !== action.bouquetId
        )
      }

    case ADD_BOUQUET:
      return {...state, bouquets: [action.bouquet]}

    default:
      return state
  }
}
