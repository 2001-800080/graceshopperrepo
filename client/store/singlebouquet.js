import axios from 'axios'

const GOT_BOUQUET = 'GOT_BOUQUET'

export const gotBouquet = bouquet => ({
  type: GOT_BOUQUET,
  bouquet
})

export const getBouquet = bouquetId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/bouquets/${bouquetId}`)
      dispatch(gotBouquet(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(bouquet = {}, action) {
  switch (action.type) {
    case GOT_BOUQUET:
      return action.bouquet
    default:
      return bouquet
  }
}
