import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCart,
  addToCart,
  decrementFromCart,
  deleteFromCart,
  clearCart
} from '../store/cart'
import {CartRender} from './index'
import {ConfirmationPage} from './confirmation_page'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleDecrease = this.handleDecrease.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleIncrease = this.handleIncrease.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  handleDecrease(item) {
    this.props.dispatchDecrementFromCart(item)
    this.props.dispatchGetCart()
  }
  handleDelete(item) {
    this.props.dispatchDeleteFromCart(item)
    this.props.dispatchGetCart()
  }
  handleIncrease(item) {
    this.props.dispatchAddToCart(item)
    this.props.dispatchGetCart()
  }
  handleClear() {
    this.props.dispatchClearCart()
    this.props.dispatchGetCart()
  }
  componentDidMount() {
    this.props.dispatchGetCart()
  }

  // const bouquets = props.bouquets
  render() {
    return (
      <div className="whole-cart-container">
        <div className="cart-render-container">
          <p className="checkout-name-box">Product</p>
          <p className="checkout-price-box">Price</p>
          <p className="checkout-quantity-box">Qty</p>
          <p className="checkout-row-total">Amount</p>
        </div>
        <div>
          {this.props.currentCart.length &&
            this.props.currentCart.map(item => (
              <CartRender
                key={item.bouquet.id}
                total={(item.bouquet.price * item.quantity).toFixed(2)}
                item={item}
                handleDelete={this.handleDelete}
                handleIncrease={this.handleIncrease}
                handleDecrease={this.handleDecrease}
              />
            ))}
        </div>

        <div>
          <p>Total</p>
          <p>
            $
            {this.props.currentCart
              .map(el => el.bouquet.price * el.quantity)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}
          </p>
          <Link to="/confirmation">
            <button type="button" onClick={() => this.handleClear()}>
              Complete Purchase
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapPropToCart = state => ({
  currentCart: state.currentCart
})

const mapDispatch = dispatch => ({
  // handleDelete(index){
  // 	dispatch(deleteFromCart(index))
  // },
  dispatchGetCart: () => dispatch(getCart()),
  dispatchAddToCart: bouquet => dispatch(addToCart(bouquet)),
  dispatchDecrementFromCart: bouquet => dispatch(decrementFromCart(bouquet)),
  dispatchDeleteFromCart: bouquet => dispatch(deleteFromCart(bouquet)),
  dispatchClearCart: () => dispatch(clearCart())
})

export default connect(mapPropToCart, mapDispatch)(Cart)
