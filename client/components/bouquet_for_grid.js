import React from 'react'

const BouquetForGrid = props => {
  const {bouquet} = props
  return (
    <div className="flower-grid">
      <img className="small-image" src={bouquet.imageUrl} alt="flower image" />
      <p>{bouquet.price}</p>
    </div>
  )
}

export default BouquetForGrid
