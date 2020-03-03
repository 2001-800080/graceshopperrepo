const Sequelize = require('sequelize')
const db = require('../db')

const BouquetOrders = db.define('BouquetOrder', {
  bouquetId: {
    type: Sequelize.INTEGER
  },
  orderId: {
    type: Sequelize.INTEGER
  }
})

BouquetOrders.prototype.setBouquetId = function() {
  //???
}

module.exports = BouquetOrders
