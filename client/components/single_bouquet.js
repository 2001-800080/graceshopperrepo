import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBouquet} from '../store/singlebouquet'

class SingleBouquet extends Component {
  componentDidMount() {
    this.props.getBouquet(this.props.match.params.bouquetId)
  }
  render() {
    console.log(this.props)
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
          <h4>${this.props.bouquet.price}</h4>
          <button type="button">Add to Cart</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bouquet: state.bouquet
})
const mapDispatchToProps = dispatch => ({
  getBouquet: bouquetId => dispatch(getBouquet(bouquetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBouquet)
