import React from 'react'
import Payment from './purchaseform'
import OrderForm from './orderform'
import {Link} from 'react-router-dom'

class Form extends React.Component {
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
          <Link to="/confirmation">
            <button type="button">Complete Purchase</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Form
