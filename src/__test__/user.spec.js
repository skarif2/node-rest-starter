'use strict'

const supertest = require('supertest')
const httpStatus = require('http-status')

const app = require('../index')
const User = require('../api/user/user.model')
const JWToken = require('../libs/JWToken')

afterAll((done) => {
  User.deleteMany({})
    .then(() => done())
    .catch(done)
})

describe('User API specs', () => {
  let user = {
    username: 'user123',
    mobileNumber: '1234567890',
    password: 'pass123'
  }
  const token = JWToken.create(user, '10m')

  describe('POST /api/users', () => {
    test('should create new user', (done) => {
      supertest(app)
        .post('/api/users')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).toEqual(user.username)
          expect(res.body.mobileNumber).toEqual(user.mobileNumber)
          expect(res.body).not.toHaveProperty('password', user.password)
          return done()
        })
        .catch(done)
    })
  })

  describe('GET /api/users/:userId', () => {
    test('should get user details', async (done) => {
      user = await User.findOne({ username: user.username })
      supertest(app)
        .get(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).toEqual(user.username)
          expect(res.body.mobileNumber).toEqual(user.mobileNumber)
          expect(res.body).not.toHaveProperty('password', user.password)
          return done()
        })
        .catch(done)
    })
  })
})
