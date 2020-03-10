import React from 'react'
import Payment from './purchaseform'
import OrderForm from './orderform'
import {Link} from 'react-router-dom'
import {clearCart, getCart} from '../store/cart'
import {connect} from 'react-redux'

import {makeOrderCheckoutThunk} from '../store/order'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear() {
    this.props.dispatchMakeOrder(this.props.currentCart)
    this.props.dispatchClearCart()
    this.props.dispatchGetCart()
  }
  componentDidMount() {
    this.props.dispatchGetCart()
  }

  render() {
    return (
      <div>
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
  dispatchMakeOrder: item => dispatch(makeOrderCheckoutThunk(item))
})

export default connect(mapPropToCart, mapDispatch)(Form)
