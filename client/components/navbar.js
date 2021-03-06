import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getCart, clearCart} from '../store/cart'
import {TinyCart} from './index'

class Navbar extends Component {
  render() {
    const {handleClick, isLoggedIn, currentCart} = this.props
    return (
      <div className="background">
        <div className="background">
          <h1 className="vvTitle">Violet Vines</h1>
          <nav>
            {isLoggedIn ? (
              <div className="nav-bar-container">
                {/* The navbar will show these links after you log in */}
                <div>
                  <Link to="/home">My Page</Link>
                  <a href="#" onClick={() => handleClick(currentCart)}>
                    Logout
                  </a>
                  <Link to="/">All Bouquets</Link>
                  <Link to="/cart">View Cart</Link>
                </div>
                <div>
                  <Link to="/cart">
                    <TinyCart currentCart={currentCart} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="nav-bar-container">
                {/* The navbar will show these links before you log in */}
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/">All Bouquets</Link>
                  <Link to="/cart">View Cart</Link>
                </div>
                <div>
                  <Link to="/cart">
                    <TinyCart currentCart={currentCart} />
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    currentCart: state.currentCart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
      dispatch(getCart())
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
