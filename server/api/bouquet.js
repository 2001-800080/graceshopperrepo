const router = require('express').Router()
const {Bouquet} = require('../db/models')

//GET /api/bouquets

router.get('/', async (req, res, next) => {
  try {
    const getAllBouquets = await Bouquet.findAll({order: [['id', 'ASC']]})
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
    const id = req.params.bouquetId
    const findBouquetById = await Bouquet.findByPk(id)
    res.send(findBouquetById)
  } catch (error) {
    next(error)
  }
})

router.post('/:bouquetId', async (req, res, next) => {
  try {
    const findBouquet = await Bouquet.findOne({
      where: {
        id: req.params.bouquetId
      }
    })
    if (findBouquet === null) {
      res.sendStatus(404)
    }
    await findBouquet.update(req.body)
    res.send(findBouquet)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const newBouquet = await Bouquet.create(req.body)
    res.json(newBouquet)
  } catch (error) {
    next(error)
  }
})

router.delete('/:bouquetId', async (req, res, next) => {
  try {
    const findBouquetToDelete = await Bouquet.findOne({
      where: {
        id: req.params.bouquetId
      }
    })
    if (findBouquetToDelete === null) {
      res.sendStatus(404)
    }
    await findBouquetToDelete.destroy()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
