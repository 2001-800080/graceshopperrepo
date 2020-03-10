const router = require('express').Router()
const {Bouquet} = require('../db/models')

function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    const err = new Error("Wait that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

//GET /api/bouquets

router.get('/', async (req, res, next) => {
  try {
    const getAllBouquets = await Bouquet.findAll({order: [['id', 'ASC']]})
    const getSomeBouquets = await Bouquet.findAll({
      order: [['id', 'ASC']],
      attributes: ['name', 'id', 'description', 'price', 'imageUrl']
    })
    if (getSomeBouquets && (!req.user || !req.user.isAdmin)) {
      res.send(getSomeBouquets)
    } else if (getAllBouquets && req.user.isAdmin) {
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
    const guestBouq = await Bouquet.findOne({
      where: {id: id},
      attributes: ['name', 'id', 'description', 'price', 'imageUrl']
    })
    if (guestBouq && (!req.user || !req.user.isAdmin)) {
      res.send(guestBouq)
    } else if (findBouquetById && req.user.isAdmin) {
      res.send(findBouquetById)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const bouquet = await Bouquet.create(req.body)
    res.json(bouquet)
  } catch (error) {
    next(error)
  }
})

router.delete('/:bouquetId', isAdmin, async (req, res, next) => {
  try {
    const bouquet = await Bouquet.findByPk(req.params.bouquetId)
    if (bouquet) {
      await Bouquet.destroy({
        where: {id: req.params.bouquetId}
      })
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:bouquetId', isAdmin, async (req, res, next) => {
  try {
    const bouquet = await Bouquet.findById(req.params.bouquetId)
    if (bouquet) {
      const updated = await Bouquet.update(req.body)
      res.json(updated)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
