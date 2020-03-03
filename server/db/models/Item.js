const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  bouquetId: {
    type: Sequelize.INTEGER
  },
  orderId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
})

// BouquetOrders.prototype.setBouquetId = function() {
//   //???
// }

module.exports = Item
