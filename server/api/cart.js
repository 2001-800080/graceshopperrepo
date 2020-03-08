const router = require('express').Router()
const {User, Order, Bouquet, BouquetOrder} = require('../db/models')

//the selfOrAdmin function currently locks out all guest ability to make an order since they are neither a user or an admin
// function isSelfOrAdmin(req, res, next) {
//   if (req.params.id === req.user.id || req.user.isAdmin) return next()
// }

router.post('/checkout', async (req, res, next) => {
  try {
    const newOrder = req.body
    let order
    if (req.user) {
      order = await Order.create({
        isCart: 'complete',
        purchaseDate: new Date(),
        userId: req.user.id
      })
    } else {
      order = await Order.create({
        isCart: 'complete',
        purchaseDate: new Date()
      })
    }
    newOrder.forEach(async bouquet => {
      const bouquetToFind = await Bouquet.findByPk(bouquet.id)
      await bouquetToFind.addOrder(order)
      let bouquetOrder = await BouquetOrder.findOne({
        where: {orderId: order.id, bouquetId: bouquet.id}
      })
      bouquetOrder.quantity = bouquet.quantity
      bouquetOrder.cost = bouquet.bouquet.price * 100 * bouquet.quantity
      bouquetOrder.save()
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    console.log('in logout api route')
    const newOrder = req.body
    let order
    const foundOrder = await Order.findOne({where: {isCart: 'pending'}})
    if (foundOrder) {
      foundOrder.destroy()
    }
    order = await Order.create({
      isCart: 'pending',
      purchaseDate: new Date(),
      userId: req.user.id
    })
    newOrder.forEach(async bouquet => {
      const bouquetToFind = await Bouquet.findByPk(bouquet.id)
      await bouquetToFind.addOrder(order)
      let bouquetOrder = await BouquetOrder.findOne({
        where: {orderId: order.id, bouquetId: bouquet.id}
      })
      bouquetOrder.quantity = bouquet.quantity
      bouquetOrder.cost = bouquet.bouquet.price * 100 * bouquet.quantity
      bouquetOrder.save()
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const user = await User.findOne({where: {email: email}})
    const pendingOrder = await Order.findOne({
      where: {userId: user.id, isCart: 'pending'},
      include: [{model: Bouquet, BouquetOrder}]
    })
    const cart = pendingOrder.bouquets.map(bouquet => {
      return {
        id: bouquet.id,
        bouquet: bouquet,
        quantity: bouquet.BouquetOrder.quantity
      }
    })
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
