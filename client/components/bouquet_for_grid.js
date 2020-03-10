import React from 'react'
import {connect} from 'react-redux'
import {addToCart, updateCartThunk} from '../store/cart'

export const BouquetForGrid = props => {
  const {bouquet} = props
  return (
    <div className="flower-grid">
      <img className="small-image" src={bouquet.imageUrl} alt="flower image" />
      <p className="pricefont">${bouquet.price}</p>
      <button
        className="all-flowers-cart-button"
        type="submit"
        onClick={() => props.handleClick(bouquet)}
      >
        Add to Cart
      </button>
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  handleClick: bouquet => dispatch(updateCartThunk(addToCart, bouquet))
})

export default connect(null, mapDispatchToProps)(BouquetForGrid)
