import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCart,
  addToCart,
  decrementFromCart,
  deleteFromCart
} from '../store/cart'

const Cart = props => {
  // const bouquets = props.bouquets

  return (
    <div>
      <div>
        <div className="container">
          <div className="row">
            <div>
              <div>
                <div>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.cart.length &&
                          props.cart.map((item, index) => (
                            <tr key={item.id}>
                              <td>
                                <Link to={`/${item.bouquet.id}`}>
                                  {item.bouquet.name}
                                </Link>
                              </td>

                              <td>
                                <small>&#36;</small>
                                {item.bouquet.price}
                              </td>
                              <td align="center">{item.quantity}</td>
                              <td>
                                <small>&#36;</small>
                                {item.bouquet.price * item.quantity}
                              </td>
                              <td>
                                <div>
                                  <button
                                    type="submit"
                                    onClick={() => {
                                      props.handleDecrease(item)
                                      props.getCart()
                                    }}
                                  >
                                    remove one
                                  </button>
                                  <button
                                    type="submit"
                                    onClick={() => props.handleIncrease(item)}
                                  >
                                    add{' '}
                                  </button>
                                  <button
                                    type="submit"
                                    onClick={() => props.handleDelete(item)}
                                  >
                                    {' '}
                                    delete all
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td>Total</td>
                          <td>
                            <small>$</small>
                            {props.cart
                              .map(el => el.bouquet.price * el.quantity)
                              .reduce((a, b) => a + b, 0)}
                          </td>
                          <td>
                            <Link to="/checkout">
                              <button type="button">Complete Purchase</button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
      dispatch(getCart())
    },
    handleDelete(bouquet) {
      dispatch(deleteFromCart(bouquet))
    }
  }
}

export default connect(mapPropToCart, mapDispatch)(Cart)
