const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER
  },
  bouquetId: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATE
  },
  address: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
