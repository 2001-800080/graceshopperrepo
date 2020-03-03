const Sequelize = require('sequelize')
const db = require('../db')

const BouquetOrder = db.define('BouquetOrder', {
  bouquetId: {
    type: Sequelize.INTEGER
  },
  orderId: {
    type: Sequelize.INTEGER
  }
})

module.exports = BouquetOrder
