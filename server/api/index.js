const router = require('express').Router()
const bouquetRoutes = require('./bouquet')
module.exports = router

router.use('/users', require('./users'))
// be consistent
router.use('/bouquets', bouquetRoutes)
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
