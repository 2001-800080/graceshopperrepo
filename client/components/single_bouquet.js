import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBouquet} from '../store/singlebouquet'
import {addToCart, getCart, updateCartThunk} from '../store/cart'

class SingleBouquet extends Component {
  componentDidMount() {
    this.props.getBouquet(this.props.match.params.bouquetId)
    this.props.getCart()
  }
  render() {
    return (
      <div className="single-page">
        <img
          className="big-image"
          src={this.props.bouquet.imageUrl}
          alt="Flower Image"
        />
        <div className="single-page-info">
          <p className="single-bouquet-name">{this.props.bouquet.name}</p>
          <p>{this.props.bouquet.description}</p>
          <h4 className="pricefont">${this.props.bouquet.price}</h4>

          <div>
            <button
              className="button"
              type="submit"
              onClick={() => this.props.handleClick(this.props.bouquet)}
            >
              Add to Cart
            </button>

            <button className="button">
              <Link to="/cart">Go to Cart</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentCart: state.currentCart,
  bouquet: state.bouquet
})
const mapDispatchToProps = dispatch => ({
  getBouquet: bouquetId => dispatch(getBouquet(bouquetId)),
  handleClick: bouquet => dispatch(updateCartThunk(addToCart, bouquet)),
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBouquet)
