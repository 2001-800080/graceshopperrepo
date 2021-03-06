const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')

function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
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

router.get('/:id', isAdmin, async (req, res, next) => {
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

router.get('/:id/orders/:orderId', isSelfOrAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByPk(orderId)
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

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

router.put('/:id', isSelfOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
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

module.exports = router
