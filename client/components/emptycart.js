import React from 'react'
import {Link} from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="not-found-page">
      <br />
      <br />
      <center>
        <img src="https://pngimage.net/wp-content/uploads/2018/05/empty-cart-png.png" />
        <h2>
          Click{' '}
          <Link to="/">
            <u>here</u>
          </Link>{' '}
          to continue shopping
        </h2>
      </center>
    </div>
  )
}

export default EmptyCart
