import React from 'react'
import {connect} from 'react-redux'

const TinyCart = props => {
  console.log('tinyCart', props.currentCart)
  return (
    <div className="all-bouquet-cart">
      <img src="https://img.icons8.com/metro/26/000000/shopping-cart.png" />
      <p className="tiny-cart-spacing">
        {props.currentCart
          .map(item => item.quantity)
          .reduce((a, b) => a + b, 0)}
      </p>
      <p className="tiny-cart-spacing">ITEMS</p>
    </div>
  )
}

const mapStateToProps = state => ({
  currentCart: state.currentCart
})

export default connect(mapStateToProps)(TinyCart)
