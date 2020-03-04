const Sequelize = require('sequelize')
const db = require('../db')

const BouquetOrder = db.define('BouquetOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  cost: {
    type: Sequelize.INTEGER,
    get() {
      const pennies = this.getDataValue(cost)
      return pennies / 100
    }
  }
})

module.exports = BouquetOrder
