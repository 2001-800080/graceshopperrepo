const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
module.exports = router

function isLoggedIn(req, res, next) {
  if (!req.user || req.user.id !== req.params.id) {
    const err = new Error("Wait, that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    const err = new Error("Wait that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

function isSelfOrAdmin(req, res, next) {
  if (req.params.id === req.user.id || req.user.isAdmin) return next()
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.json({
        id: user.id,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName
      })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
//order for a certain id
router.get('/:id/orders/:orderId', isSelfOrAdmin, async (req, res, next) => {
  try {
    const order = await Order.findById(orderId)
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// create user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// delete user
router.delete('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      const deletedUser = await User.destroy({where: {id: req.params.id}})
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

//  edit user
// TODO: what if user wants to edit own info but we have block from making himself an admin.
router.put('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (user && req.body.isAdmin === false) {
      const updated = await user.update(req.body)
      res.json(updated)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// post order for guest or user
router.post('/order', async (req, res, next) => {
  try {
    let order = req.body
    order.isCart = 'complete'
    if (req.user) {
      order.userId = req.user.id
    }
    const savedOrder = await Order.create(order)
    res.json(savedOrder)
  } catch (error) {
    next(error)
  }
})

// //alter order
// router.put('/:id/orders/:orderId', isSelfOrAdmin, async (req, res, next) => {
//   try {
//     const order = await Order.findById(req.params.orderId)
//     if (order) {
//       const updatedOrder = await order.update(req.body)
//       res.json(updatedOrder)
//     } else {
//       res.sendStatus(404)
//     }
//   } catch (error) {
//     next(error)
//   }
// })
