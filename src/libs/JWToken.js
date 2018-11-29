const jwt = require('jsonwebtoken')
const env = require('../config/environment')

/**
 * Create JSON Web Token
 * @param {Object} data data payload for jwt
 * @param {String} expiresIn expire time i.e. '1d', '1h' or '20m'
 */
const create = (data, expiresIn) => jwt.sign({ data, }, env.JWT_SECRET, { expiresIn, })

/**
 * Get payload data from JWT
 * @param {String} token JWT token
 */
const getData = (token) => jwt.decode(token)

module.exports = {
  create,
  getData,
}
