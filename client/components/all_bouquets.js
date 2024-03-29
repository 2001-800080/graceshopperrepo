import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BouquetForGrid} from './index'
import {Link} from 'react-router-dom'
import {getAllBouquets} from '../store/bouquet'
import {getCart} from '../store/cart'

export class AllBouquets extends Component {
  componentDidMount() {
    this.props.dispatchGetCart()
    this.props.getAllBouquets()
  }
  render() {
    return (
      <div>
        <div className="bouquet-grid">
          {this.props.bouquets.map(bouquet => (
            <div className="single-bouquet-square" key={bouquet.id}>
              <Link
                className="single-bouquet-name"
                to={`/bouquets/${bouquet.id}`}
              >
                {bouquet.name}{' '}
              </Link>
              <BouquetForGrid bouquet={bouquet} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  bouquets: state.bouquets,
  currentCart: state.currentCart
})

const mapDispatchToProps = dispatch => ({
  getAllBouquets: () => dispatch(getAllBouquets()),
  dispatchGetCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBouquets)
