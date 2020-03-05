import React from 'react'
import {Link} from 'react-router-dom'

const CartRender = props => {
  const {item, total, handleDecrease, handleIncrease, handleDelete} = props
  return (
    <div>
      <div>
        <Link to={`/${item.bouquet.id}`}>{item.bouquet.name}</Link>
        <p>{item.bouquet.price}</p>
        <p>{item.quantity}</p>
        <p>{total}</p>
      </div>
      <div>
        <button type="submit" onClick={handleDecrease}>
          remove one
        </button>
        <button type="submit" onClick={handleIncrease}>
          add
        </button>
        <button type="submit" onClick={handleDelete}>
          delete all
        </button>
      </div>
    </div>
  )
}

export default CartRender
