import axios from 'axios'

const GOT_ALL_BOUQUETS = 'GOT_ALL_BOUQUETS'

export const gotAllBouquets = bouquets => ({
  type: GOT_ALL_BOUQUETS,
  bouquets
})

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

export default function(bouquets = [], action) {
  switch (action.type) {
    case GOT_ALL_BOUQUETS:
      return action.bouquets
    default:
      return bouquets
  }
}
