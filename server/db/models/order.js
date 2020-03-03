const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
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
  },
  phoneNumber: {
    type: Sequelize.INTEGER
  },
  payment: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  },
  totalCost: {
    type: Sequelize.FLOAT
  }
})

module.exports = Order
