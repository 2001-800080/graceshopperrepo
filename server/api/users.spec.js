/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

const userCredentials = {
  email: 'admin@violetvines.com',
  password: 'testing'
}
const authenticatedUser = request.agent(app)

before(done => {
  console.log(userCredentials)
  authenticatedUser
    .post('/auth/login')
    .send(userCredentials)
    .end((err, response) => {
      try {
        expect(response.statusCode).to.equal(200)
        expect('location', '/home')
        done()
      } catch (error) {
        console.error(err)
      }
    })
})

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: 'Cody',
        lastName: 'Pug',
        isAdmin: true
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
