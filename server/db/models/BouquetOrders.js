const Sequelize = require('sequelize')
const db = require('../db')

const BouquetOrder = db.define('BouquetOrder', {
    // unnecessary fields below since it already exists.
  // you do want to add quantity/cost as actual necessary fields
  // bouquetId: {
  //   type: Sequelize.INTEGER
  // },
  // orderId: {
  //   type: Sequelize.INTEGER
  // }
})

module.exports = BouquetOrder
