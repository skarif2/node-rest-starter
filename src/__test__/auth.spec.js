'use strict'

const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const httpStatus = require('http-status')

const app = require('../index')
const User = require('../api/user/user.model')

const salt = bcrypt.genSaltSync(10)

afterAll((done) => {
  User.deleteMany({})
    .then(() => done())
    .catch(done)
})

describe('auth specs', () => {
  let user = {
    username: 'user321',
    mobileNumber: '1234567890',
    password: 'pass123'
  }

  describe('POST /api/auth/login', () => {
    test('should return unauthorized', async (done) => {
      const saveUser = new User({
        username: user.username,
        mobileNumber: user.mobileNumber,
        password: bcrypt.hashSync(user.password, salt)
      })
      await saveUser.save()
      supertest(app)
        .post('/api/auth/login')
        .send({ username: user.username, password: 'wrongpass' })
        .expect(httpStatus.UNAUTHORIZED)
        .then(done())
        .catch(done)
    })

    test('should return user with JWT', async (done) => {
      supertest(app)
        .post('/api/auth/login')
        .send({ username: user.username, password: user.password })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).toHaveProperty('token')
          expect(res.body.token.split('.')).toHaveLength(3)
          expect(res.body.user).toHaveProperty('_id')
          expect(res.body.user.username).toEqual(user.username)
          expect(res.body.user.mobileNumber).toEqual(user.mobileNumber)
          expect(res.body.user).not.toHaveProperty('password')
          user = res.body
          return done()
        })
        .catch(done)
    })
  })
})
