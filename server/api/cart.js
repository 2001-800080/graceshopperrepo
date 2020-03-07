const router = require('express').Router()
const {User, Order, Bouquet} = require('../db/models')

// function isSelfOrAdmin(req, res, next) {
//   if (req.params.id === req.user.id || req.user.isAdmin) return next()
// }
router.post('/', async (req, res, next) => {
  try {
    let order = req.body
    order.isCart = 'complete'
    if (req.user) {
      order.userId = req.user.id
    }
    const savedOrder = await Order.create(order, {
      include: [
        {
          model: Bouquet
        }
      ]
    })
    res.json(savedOrder)
  } catch (error) {
    next(error)
  }
})

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
