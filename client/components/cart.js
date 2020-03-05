import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCart,
  addToCart,
  decrementFromCart,
  deleteFromCart
} from '../store/cart'
import {CartRender} from './index'

class Cart extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getCart()
  }
  // const bouquets = props.bouquets
  render() {
    return (
      <div>
        <div>
          <p>Product</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Amount</p>
        </div>
        <div>
          {this.props.currentCart.length &&
            this.props.currentCart.map(item => (
              <CartRender
                key={item.bouquet.id}
                total={item.bouquet.price * item.quantity}
                item={item}
                handleDelete={this.props.handleDelete}
                handleIncrease={this.props.handleIncrease}
                handleDecrease={this.props.handleDecrease}
              />
            ))}
        </div>

        <div>
          <p>Total</p>
          <p>
            $
            {this.props.currentCart
              .map(el => el.bouquet.price * el.quantity)
              .reduce((a, b) => a + b, 0)}
          </p>
          <Link to="/checkout">
            <button type="button">Complete Purchase</button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapPropToCart = state => ({
  currentCart: state.currentCart
})

const mapDispatch = dispatch => {
  return {
    // handleDelete(index){
    // 	dispatch(deleteFromCart(index))
    // },
    getCart() {
      dispatch(getCart())
    },
    handleIncrease(bouquet) {
      dispatch(addToCart(bouquet))
    },
    handleDecrease(bouquet) {
      dispatch(decrementFromCart(bouquet))
    },
    handleDelete(bouquet) {
      dispatch(deleteFromCart(bouquet))
    }
  }
}

export default connect(mapPropToCart, mapDispatch)(Cart)
