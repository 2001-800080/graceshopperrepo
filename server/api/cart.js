const router = require('express').Router()
const {User, Order, Bouquet, BouquetOrder} = require('../db/models')

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
//NOT CURRENTLY USING THE BELOW-- NEED TO DISCUSS//
router.put('/:userId/cart', async (req, res, next) => {
  try {
    console.log('req.params.userId', req.params.userId)
    console.log('doing router.put in cart.js!!!!!!><><><><><><><')
    let user = await User.findOne({where: {id: req.params.userId}})
    console.log('USERRRRRR: ', user)
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: 'pending'
      },
      include: [Bouquet]
    })
    if (order) {
      res.send(order)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
