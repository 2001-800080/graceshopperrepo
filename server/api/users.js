const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({})
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findOne({
      where: {id: userId}
    })
    const cart = await Order.create({
      where: {
        userId: userId,
        isCart: 'pending'
      }
    })
    await cart.save()
    if (user) {
      res.send(user)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log('ERROR THAT USER DOES NOT EXIST')
  }
})
