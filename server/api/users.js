const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
module.exports = router

function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    const err = new Error("Wait that's illegal")
    err.status = 401
    return next(err)
  }
  next()
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

router.get('/:id', async (req, res, next) => {
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
router.get('/:id/orders', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
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
router.delete('/:id', async (req, res, next) => {
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
router.put('/:id', async (req, res, next) => {
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
