const {expect} = require('chai')
const db = require('../index')
const Bouquet = db.model('bouquet')

describe('Bouquet model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    it('requires "name"', async () => {
      const bouquet = Bouquet.build()

      try {
        await bouquet.validate()
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })
  }) // end describe('validations')

  describe('price getter', async () => {
    try {
      const createdBouquet = await Bouquet.create({
        name: 'Nuria Bouquet',
        price: 5000
      })
    } catch (err) {
      console.error(err)
    }
    it('converts pennies to dollars in decimals', () => {
      expect(createdBouquet.price).to.equal(50.0)
    })
  })
}) // end describe('Bouquet model')
