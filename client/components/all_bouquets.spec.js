import {expect} from 'chai'
import React from 'react'
import axios from 'axios'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllBouquets} from './all_bouquets'
import {getAllBouquets} from '../store/bouquet'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
import BouquetForGrid from './bouquet_for_grid'
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

  const bouquets = [
    {
      name: 'Lurline Bouquet',
      description:
        'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.',
      price: 7216,
      quantity: 4,
      imageUrl: 'https://sf.tac-cdn.net/images/products/small/TEV28-2.jpg'
    },
    {
      name: 'Emmeline Bouquet',
      description:
        'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
      price: 3234,
      quantity: 88
    },
    {
      name: 'Laverna Bouquet',
      description:
        'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.',
      price: 5976,
      quantity: 74
    }
  ]

  beforeEach(() => {
    allBouqs = shallow(
      <AllBouquets bouquets={bouquets} getAllBouquets={getAllBouquets} />
    )
  })

  it('renders all the bouquets with the text All Bouquets in an h1 tag', () => {
    const renderedBouquets = allBouqs.find(BouquetForGrid)
    expect(renderedBouquets.length).to.equal(3)
    expect(renderedBouquets.get(2).props.bouquet.name).to.equal(
      'Laverna Bouquet'
    )
  })
})
