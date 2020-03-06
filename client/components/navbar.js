import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {TinyCart} from './index'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div>
      <h1 className="vvTitle">Violet Vines</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/">All Bouquets</Link>
          </div>
        ) : (
          <div className="nav-bar-container">
            {/* The navbar will show these links before you log in */}
            {/* <Link to="/cart">Cart</Link> */}
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/">All Bouquets</Link>
            </div>
            <div>
              <Link to="/cart">
                <TinyCart />
              </Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
