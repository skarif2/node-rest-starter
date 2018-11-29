const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')

function load (req, res, next) {
  console.log('OK :: load user')
  next()
}

function create (req, res, next) {
  res.json('OK :: create user')
}

function list (req, res, next) {
  const err = new APIError('Awesome error', httpStatus.UNAUTHORIZED)
  // res.json('OK :: user list')
  next(err)
}

function get (req, res, next) {
  console.log('headers', req.headers)
  res.json('OK :: user get details')
}

function update (req, res, next) {
  res.json('OK :: user update')
}

function remove (req, res, next) {
  console.log('why came here...??')
  res.json('OK :: user remove')
}

module.exports = {
  load,
  create,
  list,
  get,
  update,
  remove,
}
