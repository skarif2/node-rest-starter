'use strict'

const supertest = require('supertest')
const httpStatus = require('http-status')

const app = require('../index')
const User = require('../api/user/user.model')

afterAll((done) => {
  User.remove({})
    .then(() => done())
    .catch(done)
})

describe('User API specs', () => {
  let user = {
    username: 'user123',
    mobileNumber: '1234567890',
    password: 'pass123'
  }

  describe('POST /api/users', () => {
    test('should create new user', (done) => {
      supertest(app)
        .post('/api/users')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          console.log(res.body)
          expect(res.body.username).toEqual(user.username)
          expect(res.body.mobileNumber).toEqual(user.mobileNumber)
          return done()
        })
        .catch(done)
    })
  })
})
