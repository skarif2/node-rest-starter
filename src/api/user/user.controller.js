const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')
const User = require('./user.model')

/**
 * Load user and append to req object
 */
function load (req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get user
 * @returns {<User, Error>}
 */
function get (req, res, next) {
  return res.json(req.user)
}

function create (req, res, next) {
  res.json('OK :: create user')
}

function update (req, res, next) {
  res.json('OK :: user update')
}

function list (req, res, next) {
  const err = new APIError('Awesome error', httpStatus.UNAUTHORIZED)
  // res.json('OK :: user list')
  next(err)
}

function remove (req, res, next) {
  console.log('why came here...??')
  res.json('OK :: user remove')
}

module.exports = {
  load,
  get,
  create,
  list,
  update,
  remove,
}
