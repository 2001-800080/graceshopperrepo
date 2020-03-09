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
  phoneNumber: Sequelize.INTEGER,
  isCart: {
    // if there are only 2 options, would recommend putting this as a boolean. If you wanted to consider shipping, etc, then I would leave as enum
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
