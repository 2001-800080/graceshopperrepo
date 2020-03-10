const router = require('express').Router()
const {User, Order, Bouquet, BouquetOrder} = require('../db/models')

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
      await bouquetOrder.save()
      console.log('bouquetToFind, bouq', bouquetToFind, bouquet)
      bouquetToFind.quantity -= bouquet.quantity
      await bouquetToFind.save()
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// router.post('/logout', async (req, res, next) => {
//   try {
//     const newOrder = req.body
//     let order
//     const foundOrder = await Order.findOne({
//       where: {isCart: 'pending', userId: req.user.id}
//     })
//     if (foundOrder) {
//       foundOrder.destroy()
//     }
//     order = await Order.create({
//       isCart: 'pending',
//       purchaseDate: new Date(),
//       userId: req.user.id
//     })
//     newOrder.forEach(async bouquet => {
//       const bouquetToFind = await Bouquet.findByPk(bouquet.id)
//       await bouquetToFind.addOrder(order)
//       let bouquetOrder = await BouquetOrder.findOne({
//         where: {orderId: order.id, bouquetId: bouquet.id}
//       })
//       bouquetOrder.quantity = bouquet.quantity
//       bouquetOrder.cost = bouquet.bouquet.price * 100 * bouquet.quantity
//       bouquetOrder.save()
//     })
//     res.json(order)
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/update', async (req, res, next) => {
  try {
    //req.body coming in is {
    // action: addToCart,
    // item: item we are updating
    //quantity: quantity of bouquet in line
    const action = req.body.action
    const bouquet = req.body.item
    console.log(req.body.item, 'bouquet in req.body')
    const pendingOrder = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        isCart: 'pending'
      },
      include: [{model: Bouquet}]
    })
    //order is actually pendingOrder[0]
    if (action === 'ADD_TO_CART') {
      const foundBouquet = await Bouquet.findOne({
        where: {id: bouquet.id},
        include: [{model: Order}]
      })
      await pendingOrder[0].addBouquet(foundBouquet)
      let bouquetOrder = await BouquetOrder.findOne({
        where: {orderId: pendingOrder[0].id, bouquetId: bouquet.id}
      })
      if (bouquetOrder.quantity > 0) {
        bouquetOrder.quantity = bouquetOrder.quantity + 1
      } else {
        bouquetOrder.quantity = 1
      }
      console.log(foundBouquet.price, 'FoundBouquet price')
      bouquetOrder.cost = foundBouquet.price * 100 * bouquetOrder.quantity
      await bouquetOrder.save()
    } else if (action === 'DECREMENT_FROM_CART') {
      console.log('getshere')
      // const foundBouquet = await Bouquet.findOne({
      //   where: {id: bouquet.id},
      //   include: [{model: Order}]
      // })
      // await pendingOrder[0].addBouquet(foundBouquet)
      let bouquetOrder = await BouquetOrder.findOne({
        where: {orderId: pendingOrder[0].id, bouquetId: bouquet.id}
      })
      if (bouquetOrder.quantity > 1) {
        bouquetOrder.quantity = bouquetOrder.quantity - 1
      } else {
        bouquetOrder.destroy()
      }
      bouquetOrder.cost = Number(
        (bouquetOrder.cost / bouquetOrder.quantity) * bouquetOrder.quantity
      )
      await bouquetOrder.save()
    } else if (action === 'DELETE_FROM_CART') {
      console.log('getshere')
      // const foundBouquet = await Bouquet.findOne({
      //   where: {id: bouquet.id},
      //   include: [{model: Order}]
      // })
      // await pendingOrder[0].addBouquet(foundBouquet)
      let bouquetOrder = await BouquetOrder.findOne({
        where: {orderId: pendingOrder[0].id, bouquetId: bouquet.id}
      })
      bouquetOrder.destroy()
      await bouquetOrder.save()
    }
    res.sendStatus(200)
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
