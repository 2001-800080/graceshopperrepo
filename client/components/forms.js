import React from 'react'
import Payment from './purchaseform'
import OrderForm from './orderform'
import {Link} from 'react-router-dom'
import {clearCart, getCart} from '../store/cart'
import {connect} from 'react-redux'

import {makeOrderThunk} from '../store/order'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear() {
    this.props.currentCart.forEach(item => this.props.dispatchMakeOrder(item))
    this.props.dispatchClearCart()
    this.props.dispatchGetCart()
  }

  render() {
    return (
      <div>
        <h1 className="order">CheckOut Information</h1>
        <center>
          <img
            src="https://cdn.clipart.email/04cb6ba67cc9e24be570ccfeb690eab5_library-of-book-divider-clip-art-freeuse-library-png-files-_1925-284.png"
            height="90px"
          />
        </center>
        <div className="paymentDiv">
          <Payment />
          <OrderForm />
        </div>

        <div className="completebutton">
          <Link to="/confirmation" onClick={() => this.handleClear()}>
            <button type="button">Complete Purchase</button>
          </Link>
        </div>
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
  dispatchClearCart: () => dispatch(clearCart()),
  dispatchMakeOrder: item => dispatch(makeOrderThunk(item))
})

export default connect(mapPropToCart, mapDispatch)(Form)
