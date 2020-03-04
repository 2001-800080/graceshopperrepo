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
        <div className="bouquet-grid">
          {this.props.bouquets.map(bouquet => (
            <div key={bouquet.id}>
              <Link to={`/bouquets/${bouquet.id}`}>
                <h1>{bouquet.name}</h1>
              </Link>
              <SingleBouquet bouquet={bouquet} />
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
