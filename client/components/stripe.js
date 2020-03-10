import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {clearCart, getCart} from '../store/cart'
import {connect} from 'react-redux'
import {makeOrderCheckoutThunk} from '../store/order'
import history from '../history'

class Stripe extends React.Component {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear() {
    this.props.dispatchMakeOrder(this.props.currentCart)
    this.props.dispatchClearCart()
    this.props.dispatchGetCart()
    history.push('/confirmation')
  }
  componentDidMount() {
    this.props.dispatchGetCart()
  }

  render() {
    return (
      <div>
        <StripeCheckout
          stripeKey="pk_test_Mi3MWtyWC4wVQeSpVdyFpO6C00OCTXEJvG"
          token={this.handleClear}
          amount={this.props.total * 100}
          billingAddress
          shippingAddress
        />
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

export default connect(mapPropToCart, mapDispatch)(Stripe)
