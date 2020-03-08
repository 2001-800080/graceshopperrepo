const router = require('express').Router()
const {User, Order, Bouquet, BouquetOrder} = require('../db/models')

//the selfOrAdmin function currently locks out all guest ability to make an order since they are neither a user or an admin
// function isSelfOrAdmin(req, res, next) {
//   if (req.params.id === req.user.id || req.user.isAdmin) return next()
// }

router.post('/', async (req, res, next) => {
  try {
    let order
    if (req.user) {
      order = await Order.create({
        isCart: 'complete',
        purchaseDate: new Date(),
        quantity: req.body.quantity,
        userId: req.user.id
      })
    } else {
      order = await Order.create({
        isCart: 'complete',
        purchaseDate: new Date(),
        quantity: req.body.quantity
      })
    }
    const bouquet = await Bouquet.findByPk(req.body.id)
    await bouquet.addOrder(order)
    let bouquetOrder = await BouquetOrder.findOne({
      where: {
        bouquetId: req.body.id,
        orderId: order.id
      }
    })
    bouquetOrder.quantity = req.body.quantity
    bouquetOrder.cost = req.body.quantity * (req.body.bouquet.price * 100)
    await bouquetOrder.save()
    bouquet.quantity -= req.body.quantity
    await bouquet.save()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
