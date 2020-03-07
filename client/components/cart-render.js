import React from 'react'
import {Link} from 'react-router-dom'

const CartRender = props => {
  const {item, total, handleDecrease, handleIncrease, handleDelete} = props
  return (
    <div className="cart-render-container">
      <div className="checkout-name-box">
        <Link to={`/${item.bouquet.id}`}>{item.bouquet.name}</Link>
      </div>
      <p className=" checkout-price-box">${item.bouquet.price}</p>
      <p className="checkout-quantity-box">{item.quantity}</p>
      <div className="checkout-row-total">
        <p>${total}</p>
      </div>
      <div>
        <button
          className="checkout-change-button"
          type="submit"
          onClick={() => handleDecrease(item)}
        >
          remove one
        </button>
        <button type="submit" onClick={() => handleIncrease(item)}>
          add
        </button>
        <button type="submit" onClick={() => handleDelete(item)}>
          delete all
        </button>
      </div>
    </div>
  )
}

export default CartRender
