const router = require('express').Router()
const {Bouquet, Order, BouquetOrder, User} = require('../db/models')

//GET /api/bouquets

router.get('/', async (req, res, next) => {
  try {
    const getAllBouquets = await Bouquet.findAll()
    if (getAllBouquets) {
      res.send(getAllBouquets)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//GET /api/bouquets/:bouquetId

router.get('/:bouquetId', async (req, res, next) => {
  try {
    // console.log('------------', req.sessionID)
    const id = req.params.bouquetId
    const findBouquetById = await Bouquet.findByPk(id)
    res.send(findBouquetById)
  } catch (error) {
    next(error)
  }
})

//POST /api/:bouquetId/addToCart
router.post('/:bouquetId/addToCart', async (req, res, next) => {
  try {
    const id = req.params.bouquetId
    const order = await Order.create()
    order.quantity++
    order.save()
    const bouquetorder = await BouquetOrder.create({
      bouquetId: id,
      orderId: order.id
    })
    const findBouquetById = await Bouquet.findByPk(id)
    bouquetorder.quantity++
    bouquetorder.cost = findBouquetById.price * bouquetorder.quantity * 100
    bouquetorder.save()
    res.json(bouquetorder)

    // const orderCreate = await BouquetOrder.create()
    // const guest = await User.create(req.body)
    // console.log('0000000000', guest)
  } catch (error) {
    next(error)
  }
})

module.exports = router
