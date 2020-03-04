import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBouquet} from '../store/singlebouquet'

class SingleBouquet extends Component {
  componentDidMount() {
    this.props.getBouquet(this.props.match.params.bouquetId)
  }
  render() {
    console.log(this.props.match)

    return (
      <div key={this.props.bouquet.id}>
        <h1>{this.props.bouquet.name}</h1>
        <img src={this.props.bouquet.imageUrl} />
        <p>{this.props.bouquet.description}</p>
        <h4>${this.props.bouquet.price}</h4>
        <button type="button">Add to Cart</button>
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
