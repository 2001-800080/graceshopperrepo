import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleBouquet} from './index'

class AllBouquets extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h1>All Bouquets</h1>
        <SingleBouquet />
      </div>
    )
  }
}

export default connect(null)(AllBouquets)
