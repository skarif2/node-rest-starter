'use strict'

const supertest = require('supertest')
const httpStatus = require('http-status')

const app = require('../index')

// async/await can be used.
describe('misc specs', () => {
  describe('API success specs', () => {
    test('should return OK', async (done) => {
      supertest(app)
        .get('/api')
        .expect(httpStatus.OK)
        .then(() => done())
        .catch(done)
    })
  })

  describe('API error specs', () => {
    test('should return API not found!', async (done) => {
      supertest(app)
        .get('/api/no-api')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).toEqual('Not Found')
          return done()
        })
        .catch(done)
    })

    test('should return validation error', async (done) => {
      supertest(app)
        .post('/api/users')
        .send({})
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).toEqual('"username" is required and "mobileNumber" is required and "password" is required')
          return done()
        })
        .catch(done)
    })
  })
})
