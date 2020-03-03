import React, {Component} from 'react'
import {connect} from 'react-redux'

class AllBouquets extends Component {
  constructor() {
    super()
  }
  render() {
    return <h1>All Bouquets</h1>
  }
}

export default connect(null)(AllBouquets)
