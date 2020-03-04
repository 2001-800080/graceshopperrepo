import {expect} from 'chai'
import React from 'react'
import axios from 'axios'
import enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllBouquets} from './all_bouquets'
import {getAllBouquets} from '../store/bouquet'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllBouquets', () => {
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

  let allBouqs

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
  store.dispatch(getAllBouquets())

  const bouquets = [
    {
      name: 'Lurline Bouquet',
      description:
        'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.',
      price: 7216,
      quantity: 4,
      imageUrl: 'https://sf.tac-cdn.net/images/products/small/TEV28-2.jpg'
    }
  ]

  beforeEach(() => {
    allBouqs = shallow(
      <AllBouquets bouquets={bouquets} getAllBouquets={getAllBouquets} />
    )
  })

  it('renders all the bouquets with the text All Bouquets in an h1 tag', () => {
    expect(allBouqs.find('h1').text()).to.be.equal('All Bouquets')
  })
})
