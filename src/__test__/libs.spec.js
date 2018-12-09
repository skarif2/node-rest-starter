'use strict'

const httpStatus = require('http-status')

const APIError = require('../libs/APIError')
const JWToken = require('../libs/JWToken')

// async/await can be used.
describe('libs specs', () => {
  describe('APIError specs', () => {
    test('should be instance of APIError', async () => {
      const err = new APIError('Instance of APIError',
        httpStatus.INTERNAL_SERVER_ERROR, false)
      expect(err).toBeInstanceOf(APIError)
      expect(err).toHaveProperty('status', 500)
      expect(err).toHaveProperty('isPublic', false)
      expect(err).toHaveProperty('isOperational', true)
    })

    test('should not be instance of APIError', async () => {
      const err = new Error('Not a instance of APIError')
      expect(err).not.toBeInstanceOf(APIError)
      expect(err).not.toHaveProperty('status')
      expect(err).not.toHaveProperty('isPublic')
      expect(err).not.toHaveProperty('isOperational')
    })
  })

  describe('JWToken specs', () => {
    let token
    const user = {
      id: 1,
      role: 'user'
    }
    test('sould return JWT token', () => {
      token = JWToken.create(user, '20 min')
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3)
    })

    test('should return payload', () => {
      const payload = JWToken.getData(token)
      expect(payload).toHaveProperty('id', user.id)
      expect(payload).toHaveProperty('role', user.role)
    })
  })
})
