const router = require('express').Router()
const {User, Order, Bouquet, BouquetOrder} = require('../db/models')
const stripe = require('stripe')('STRIPE_SECRET_KEY')

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

// router.post('/checkout', async (req, res) => {
//   console.log('Request:', req.body)

//   let error
//   let status
//   try {
//     const {product, token} = req.body

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id
//     })

//     const charge = await stripe.charges.create({
//       amount: product.price * 100,
//       currency: 'usd',
//       customer: customer.id,
//       receipt_email: token.email,
//       description: `Purchased the ${product.name}`,
//       shipping: {
//         name: token.card.name,
//         address: {
//           line1: token.card.address_line1,
//           line2: token.card.address_line2,
//           city: token.card.address_city,
//           country: token.card.address_country,
//           postal_code: token.card.address_zip
//         }
//       }
//     })

//     console.log('Charge:', {charge})
//     status = 'success'
//   } catch (error) {
//     console.error('Error:', error)
//     status = 'failure'
//   }

//   res.json({error, status})
// })

router.post('/logout', async (req, res, next) => {
  try {
    const newOrder = req.body
    let order
    const foundOrder = await Order.findOne({
      where: {isCart: 'pending', userId: req.user.id}
    })
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
