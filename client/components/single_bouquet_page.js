import React from 'react'
import {connect} from 'react-redux'

const SingleBouquetPage = props => {
  const {bouquet} = props
  return (
    <div className="single-page">
      <img className="big-image" src={bouquet.imageUrl} alt="flower image" />
      <div className="single-page-info">
        <h1>{bouquet.name}</h1>
        <p>{bouquet.price}</p>
        <p>{bouquet.description}</p>
      </div>
    </div>
  )
}

export default connect(null)(SingleBouquetPage)
