import React from 'react'
import {Link} from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="not-found-page">
      <br />
      <br />
      <center>
        <p>
          <font size="30">You Have An Empty Cart</font>
        </p>
        <h2>
          Look at our bouquets <Link to="/">here</Link>
        </h2>
      </center>
    </div>
  )
}

export default EmptyCart
