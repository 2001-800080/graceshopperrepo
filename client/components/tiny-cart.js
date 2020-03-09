import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {getCart} from '../store/cart'

class TinyCart extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('tiny cart')
    console.log('props', this.props)
    return (
      <div className="all-bouquet-cart">
        <img src="https://img.icons8.com/metro/26/000000/shopping-cart.png" />
        <p className="tiny-cart-spacing">
          {this.props.currentCart
            .map(item => item.quantity)
            .reduce((a, b) => a + b, 0)}
        </p>
        <p className="tiny-cart-spacing">ITEMS</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bouquets: state.bouquets
})

export default connect(mapStateToProps)(TinyCart)
