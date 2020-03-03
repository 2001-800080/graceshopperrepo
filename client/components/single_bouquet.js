import React from 'react'
import {connect} from 'react-redux'

const SingleBouquet = props => {
  const {bouquet} = props
  return (
    <div className="flowerGrid">
      <img className="small-img" src={bouquet.imageUrl} alt="flower image" />
      <p>${bouquet.price}</p>
    </div>
  )
}

export default connect(null)(SingleBouquet)
