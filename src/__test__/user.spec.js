'use strict'

const supertest = require('supertest')
const httpStatus = require('http-status')

const app = require('../index')
const User = require('../api/user/user.model')
const JWToken = require('../libs/jwToken')

afterAll((done) => {
  User.deleteMany({})
    .then(() => done())
    .catch(done)
})

describe('User API specs', () => {
  let user
  const userData = {
    username: 'user123',
    mobileNumber: '1234567890',
    password: 'pass123'
  }
  const token = JWToken.create(userData, '10m')

  describe('POST /api/users', () => {
    test('should create new user', (done) => {
      supertest(app)
        .post('/api/users')
        .send(userData)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).toHaveProperty('_id')
          expect(res.body.username).toEqual(userData.username)
          expect(res.body.mobileNumber).toEqual(userData.mobileNumber)
          expect(res.body).not.toHaveProperty('password')
          user = res.body
          return done()
        })
        .catch(done)
    })
    test('should return - duplicate key error', (done) => {
      supertest(app)
        .post('/api/users')
        .send(userData)
        .expect(httpStatus.BAD_REQUEST)
        .then(() => done())
        .catch(done)
    })
  })

  describe('GET /api/users', () => {
    test('should return users - with skip, limit', async (done) => {
      const skip = 0
      const limit = 50
      supertest(app)
        .get(`/api/users?limit=${limit}&skip=${skip}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy()
          return done()
        })
        .catch(done)
    })
    test('should return users - without skip, limit', async (done) => {
      supertest(app)
        .get(`/api/users`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy()
          return done()
        })
        .catch(done)
    })
  })

  describe('GET /api/users/:userId', () => {
    test('should return - no such user exists', async (done) => {
      supertest(app)
        .get(`/api/users/507f191e810c19729de860ea`)
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.NOT_FOUND)
        .then(() => done())
        .catch(done)
    })
    test('should get user details', async (done) => {
      supertest(app)
        .get(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).toEqual(user.username)
          expect(res.body.mobileNumber).toEqual(user.mobileNumber)
          expect(res.body).not.toHaveProperty('password')
          return done()
        })
        .catch(done)
    })
  })

  describe('PUT /api/users/:userId', () => {
    test('should update user details', async (done) => {
      supertest(app)
        .put(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ mobileNumber: '0987654321' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).toEqual(user.username)
          expect(res.body.mobileNumber).toEqual('0987654321')
          expect(res.body).not.toHaveProperty('password')
          return done()
        })
        .catch(done)
    })
  })

  describe('DELETE /api/users/:userId', () => {
    test('should delete user', async (done) => {
      supertest(app)
        .delete(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).toEqual(user.username)
          expect(res.body.mobileNumber).toEqual('0987654321')
          expect(res.body).not.toHaveProperty('password')
          return done()
        })
        .catch(done)
    })
  })
})
