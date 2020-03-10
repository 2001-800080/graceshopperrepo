import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCart,
  addToCart,
  decrementFromCart,
  deleteFromCart,
  clearCart
} from '../store/cart'
import {makeOrderCheckoutThunk} from '../store/order'
import {CartRender} from './index'
import EmptyCart from './emptycart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleDecrease = this.handleDecrease.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleIncrease = this.handleIncrease.bind(this)
  }
  handleDecrease(item) {
    this.props.dispatchDecrementFromCart(item)
  }
  handleDelete(item) {
    this.props.dispatchDeleteFromCart(item)
  }
  handleIncrease(item) {
    this.props.dispatchAddToCart(item)
  }
  componentDidMount() {
    this.props.dispatchGetCart()
  }
  render() {
    return (
      <div>
        {this.props.currentCart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="whole-cart-container">
            <div className="cart-render-container">
              <p className="checkout-name-box">Product</p>
              <p className="checkout-price-box">Price</p>
              <p className="checkout-quantity-box">Qty</p>
              <p className="checkout-row-total">Amount</p>
            </div>

            <div className="pricefont">
              {this.props.currentCart.length > 0 &&
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
              <p className="pricefont">
                $
                {this.props.currentCart
                  .map(el => el.bouquet.price * el.quantity)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)}
              </p>

              <Link to="/forms">
                <button type="button">Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}
const mapPropToCart = state => ({
  currentCart: state.currentCart,
  order: state.order
})

const mapDispatch = dispatch => ({
  dispatchGetCart: () => dispatch(getCart()),
  dispatchAddToCart: bouquet => dispatch(addToCart(bouquet)),
  dispatchDecrementFromCart: bouquet => dispatch(decrementFromCart(bouquet)),
  dispatchDeleteFromCart: bouquet => dispatch(deleteFromCart(bouquet)),
  dispatchClearCart: () => dispatch(clearCart()),
  dispatchMakeOrder: item => dispatch(makeOrderCheckoutThunk(item))
})

export default connect(mapPropToCart, mapDispatch)(Cart)
