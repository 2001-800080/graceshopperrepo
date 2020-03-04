const router = require('express').Router()
const {Bouquet} = require('../db/models')

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

//GET /api/bouquets/:id
router.get('/:bouquetId', async (req, res, next) => {
  try {
    const id = req.params.bouquetId
    const findBouquetById = await Bouquet.findByPk(id)
    res.send(findBouquetById)
  } catch (error) {
    next(error)
  }
})

module.exports = router
