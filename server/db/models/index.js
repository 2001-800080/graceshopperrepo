const User = require('./user')
const Bouquet = require('./bouquet')
const Order = require('./order')
const db = require('../db')
const BouquetOrder = require('./BouquetOrders')

// User.belongsToMany(Bouquet, {through: 'Order'})
// Bouquet.belongsToMany(User, {through: 'Order'})

Bouquet.belongsToMany(Order, {
  through: BouquetOrder,
  as: 'orders',
  foreignKey: 'bouquetId',
  otherKey: 'orderId'
})
Order.belongsToMany(Bouquet, {
  through: BouquetOrder,
  as: 'bouquets',
  foreignKey: 'orderId',
  otherKey: 'bouquetId'
})
Order.belongsTo(User, {as: 'user'})
User.hasMany(Order, {as: 'order'})
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Order,
  Bouquet,
  BouquetOrder
}
