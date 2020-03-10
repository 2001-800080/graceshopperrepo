const router = require('express').Router()
const User = require('../db/models/user')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      res.status(401).send('Attempt has invalid and/or missing input~')
    } else if (user && !req.body.password) {
      res.status(401).send('Please check your username and/or password~')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Please check your username and/or password~')
    } else {
      req.login(user, err => {
        if (err) return next(err)
        else {
          return res.json(user)
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    if (!req.body.email) {
      res.status(401).send('Please enter a valid email address')
    } else if (!req.body.password) {
      res.status(401).send('Please enter a valid password')
    } else {
      const user = await User.create(req.body)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      console.error(err)
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

module.exports = router
