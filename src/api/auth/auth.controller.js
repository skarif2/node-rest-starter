const bcrypt = require('bcryptjs')
const httpStatus = require('http-status')

const JWToken = require('../../libs/JWToken')
const APIError = require('../../libs/APIError')
const User = require('../user/user.model')

/**
 * Returns jwt token if valid useranme and password is provided
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 * @returns {<{token, user}, Error>}
 */
function login (req, res, next) {
  User.findOne({ username: req.body.username, })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = JWToken.create({
          username: user.username,
          mobileNumber: user.mobileNumber,
        }, '20m')
        return res.json({
          token,
          user: {
            username: user.username,
            mobileNumber: user.mobileNumber,
          },
        })
      }
      const err = new APIError('Authentication error!', httpStatus.UNAUTHORIZED, true)
      return next(err)
    })
    .catch(e => next(e))
}

module.exports = {
  login,
}
