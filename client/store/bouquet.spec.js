import {expect} from 'chai'
import {getAllBouquets} from '../store/bouquet'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {bouquets: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllBouquets', () => {
    it('eventually dispatches the GOT ALL BOUQUETS action', async () => {
      const fakeBouquet = [
        {
          name: 'Shelly Bouquet',
          description:
            'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
          price: 7683,
          quantity: 17
        }
      ]
      mockAxios.onGet('/api/bouquets').replyOnce(200, fakeBouquet)
      await store.dispatch(getAllBouquets())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_BOUQUETS')
      expect(actions[0].bouquets).to.be.deep.equal(fakeBouquet)
    })
  })
})
