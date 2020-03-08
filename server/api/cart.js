const router = require('express').Router()
const {User, Order, Bouquet, BouquetOrder} = require('../db/models')

//the selfOrAdmin function currently locks out all guest ability to make an order since they are neither a user or an admin
// function isSelfOrAdmin(req, res, next) {
//   if (req.params.id === req.user.id || req.user.isAdmin) return next()
// }

router.post('/', async (req, res, next) => {
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

router.get('/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const user = await User.findOne({where: {email: email}})
    console.log('in get request', user.id)
    const response = await Order.findOne({where: {userId: user.id}})
    console.log(response)
    res.send(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router
