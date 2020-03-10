import React from 'react'
import {connect} from 'react-redux'
import {addToCart, updateCartThunk} from '../store/cart'

export const BouquetForGrid = props => {
  const {bouquet, user} = props
  return (
    <div className="flower-grid">
      <img className="small-image" src={bouquet.imageUrl} alt="flower image" />
      <p className="pricefont">${bouquet.price}</p>
      <button
        className="all-flowers-cart-button"
        type="submit"
        onClick={() => props.handleClick(bouquet, user)}
      >
        Add to Cart
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  currentCart: state.currentCart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  handleClick: (bouquet, user) =>
    dispatch(updateCartThunk(addToCart, bouquet, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(BouquetForGrid)
