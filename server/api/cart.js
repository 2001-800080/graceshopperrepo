const router = require('express').Router()
const {User, Order, Bouquet} = require('../db/models')
module.exports = router

router.get('/:userId/cart', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {id: req.params.userId}})
    const order = await Order.findOrCreate({
      where: {
        userId: user,
        isCart: 'pending'
      },
      include: [Bouquet]
    })
    if (order) {
      res.send(order)
    } else {
      const cart = await Order.create({
        firstName: user.dataValue.firstName,
        lastName: user.dataValue.lastName,
        email: user.dataValue.email,
        userId: req.params.userId,
        status: 'pending'
      })
      res.send(cart)
    }
  } catch (error) {
    next(error)
  }
})

// router.put('/:userId/cart', async (req, res, next) => {
//   try {
//     let user = await User.findOne({where: {id: req.params.userId}})
//     let order = await Order.findOrCreate({
//       where: {
//         userId: user,
//         isCart: 'pending'
//       }
//     })

//     const findOrderId = await Order.findbyPk(parseInt(order[0].dataValue.id))
//     await findOrderId.addProduct([req.body.id])

//     const bouquetOrder = await BouquetOrders.findOne({
//       where: {
//         bouquetId: req.body.id,
//         orderId: findOrderId
//       }
//     })

//     //find all bouquets
//   } catch (error) {
//     next(error)
//   }
// })
