'use strict'

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../index')

afterAll((done) => {
  mongoose.model = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

describe('User API specs', () => {
  let user = {
    username: 'user123',
    mobileNumber: '1234567890',
    password: 'pass123'
  }

  describe('POST /api/users', () => {
    test('should create new user', async (done) => {
      try {
        const response = await supertest(app).post('/api/users').send(user)
        console.log('it was success!!!')
        expect(response.statusCode).toBe(200)
      } catch (e) {
        console.log('it was not a success!!!')
        done()
      }
    })
  })
})
