const Sequelize = require('sequelize')
const db = require('../db')

const Bouquet = db.define('bouquet', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 50.00
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 50
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://sf.tac-cdn.net/images/products/small/TEV28-2.jpg'
  }
})

module.exports = Bouquet
