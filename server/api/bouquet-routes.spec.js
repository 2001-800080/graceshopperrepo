const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Bouquet = db.model('bouquet')

describe('Bouquet routes', () => {
  before(() => {
    return db.sync({force: true})
  
  })

  beforeEach(async () => {
    await Bouquet.create({
      name: 'Hannah Bouquet',
      quantity: 54
    })
  })

  describe('/api/bouquets/', () => {
    it('GET /api/bouquets', async (done) => {
      const res = await request(app)
        .get('/api/bouquets')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Hannah Bouquet')
      done()
    })
  }) // end describe('/api/bouquets')
  describe('/api/bouquets/:bouquetId', () => {
    it('serves up a single Bouquet by its Id', async (done) => {
      const response = await request(app)
        .get('/api/bouquets/1')
        .expect(200)

      expect(response.body.quantity).to.equal(54)
      expect(response.body.name).to.equal('Hannah Bouquet')
      done()
    })
  })
}) // end describe('bouquets routes')
