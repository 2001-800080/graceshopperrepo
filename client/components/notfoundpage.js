import React from 'react'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <br />
      <br />
      <center>
        <h3>OOPS! PAGE NOT FOUND</h3>
        <p>
          <font size="30">404</font>
        </p>
        <h2>WE ARE SORRY, BUT THE PAGE YOU REQUESTED IS NOT FOUND</h2>

        <button>
          <Link to="/"> Go Back</Link>
        </button>
      </center>
    </div>
  )
}

export default NotFoundPage
