const User = require('./user')
const Bouquet = require('./bouquet')
const Order = require('./order')
const db = require('../db')
const BouquetOrder = require('./BouquetOrders')

Bouquet.belongsToMany(Order, {through: BouquetOrder})

Order.belongsToMany(Bouquet, {through: BouquetOrder})

Order.belongsTo(User, {as: 'user'})
User.hasMany(Order, {as: 'order'})

module.exports = {
  db,
  User,
  Order,
  Bouquet,
  BouquetOrder
}
