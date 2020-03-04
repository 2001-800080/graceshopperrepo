const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purcahseDate: Sequelize.DATE,
  quantity: {
    type: Sequelize.VIRTUAL,
    defaultValue: 0,
    get() {
      return this.getDataValue(quantity)
    }
  },
  phoneNumber: Sequelize.INTEGER,
  isCart: {
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  },
  totalCost: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue(totalCost)
    }
  }
})

module.exports = Order
