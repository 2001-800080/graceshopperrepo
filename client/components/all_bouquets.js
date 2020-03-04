import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleBouquet} from './index'
import {Link} from 'react-router-dom'
import {getAllBouquets} from '../store/bouquet'

class AllBouquets extends Component {
  componentDidMount() {
    this.props.getAllBouquets()
  }
  render() {
    return (
      <div>
        <h1>All Bouquets</h1>
        <div>
          {this.props.bouquets.map(bouquet => (
            <div key={bouquet.id}>
              <Link to={`/${bouquet.id}`}>
                <h1>{bouquet.name}</h1>
              </Link>
              <img src={bouquet.imageUrl} width="200" height="200" />
              <h4>${bouquet.price}</h4>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  bouquets: state.bouquets
})

const mapDispatchToProps = dispatch => ({
  getAllBouquets: () => dispatch(getAllBouquets())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBouquets)

{
  /* <SingleBouquet bouquet={bouquet}/> */
}
