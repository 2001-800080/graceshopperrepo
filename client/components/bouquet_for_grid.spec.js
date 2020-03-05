import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BouquetForGrid from './bouquet_for_grid'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('bouquet-for-grid', () => {
  let allBouqs
  const bouquet = {
    name: 'Lurline Bouquet',
    description:
      'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.',
    price: 7216,
    quantity: 4,
    imageUrl: 'https://sf.tac-cdn.net/images/products/small/TEV28-2.jpg'
  }

  beforeEach(() => {
    allBouqs = shallow(<BouquetForGrid bouquet={bouquet} />)
  })

  it('renders bouquet price in an p tag', () => {
    expect(allBouqs.find('p').text()).to.be.equal(`${bouquet.price}`)
  })
})
