import React from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const ConfirmationPage = () => {
  return (
    <div className="confirm-page">
      <br />
      <br />
      <center>
        <h3>Thank you for shopping at Violet Vines!</h3>
        <h2>Your order confirmation number is: {` ${getRandomInt(999999)}`}</h2>
        <p>
          <font size="30">~ PURCHASE COMPLETE ~</font>
        </p>
        <h2>
          Please look out for an email containing the full details of your
          purchase
        </h2>
      </center>
    </div>
  )
}

export default ConfirmationPage
