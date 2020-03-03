const Sequelize = require('sequelize')
const db = require('../db')

const Bouquet = db.define('bouquet', {
  // possibly having categories
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
    // SARAH: if you're not adding any new information inside of this object to make it simply the type itself instead of adding an object.
  },
  price: {
    type: Sequelize.FLOAT, // PENNIES => store this as an integer in cents.
    // conversion into decimal can happen on a getter, or you can optionally add a method either in the frontend if you want into a util file, or in the backend before you send it back.
    allowNull: false,
    defaultValue: 50.00,
    // get() {
    //   // do stuff!
    // }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 50
    // inventory -> can't be negative
  },
  available: {
    // suggest combining -> looking into a VIRTUAL field => you can call it available as if you were calling a field BUT it doesn't exist in the database, but it will be a method you can use other fields on in order to generate this!
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://sf.tac-cdn.net/images/products/small/TEV28-2.jpg'
    // possible validation for isUrl?
  }
})

module.exports = Bouquet
