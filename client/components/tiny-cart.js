import React from 'react'
import {connect} from 'react-redux'
import store from '../store'

const TinyCart = props => {
  //console.log('local json parse:', JSON.parse(localStorage.getItem('cart')))
  //console.log('props.currentCart:', props.currentCart)
  //const localCart = JSON.parse(localStorage.getItem('cart'))
  // let accurateTinyCart = props.currentCart
  //   .map(item => item.quantity)
  //   .reduce((a, b) => a + b, 0)
  //console.log('accurate tiny cart:', accurateTinyCart)
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
  currentCart: state.currentCart,
  bouquets: state.bouquets
})

export default connect(mapStateToProps)(TinyCart)
