const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchaseDate: Sequelize.DATE,
  quantity: {
    type: Sequelize.VIRTUAL,
    defaultValue: 0,
    get() {
      return this.getDataValue('quantity')
    }
  },
  isCart: {
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  },
  totalCost: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('totalCost')
    }
  }
})

module.exports = Order
