const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

const APIError = require('../../libs/APIError')
const User = require('./user.model')

const salt = bcrypt.genSaltSync(10)
/**
 * Load user and append to req object
 */
async function load (req, res, next, id) {
  try {
    req.user = await User.get(id)
    return next()
  } catch (e) {
    next(e)
  }
}

/**
 * Get user
 * @property {string} req.params.userId _id of user
 * @returns {<User, Error>}
 */
function get (req, res, next) {
  const user = req.user
  const sendUser = _.pick(user, [ '_id', 'username', 'mobileNumber', ])
  return res.json(sendUser)
}

/**
 * Create new user
 * @property {string} req.body.username username of user
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @property {string} req.body.password password of user
 * @returns {<{user}, Error>}
 */
async function create (req, res, next) {
  try {
    const user = new User({
      username: req.username,
      mobileNumber: req.mobileNumber,
      password: bcrypt.hashSync(req.password, salt),
    })
    const savedUser = await user.save()
    const sendUser = _.pick(savedUser, [ '_id', 'username', 'mobileNumber', ])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

/**
 * Update user
 * @property {string} req.params.userId _id of user
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @returns {<{user}, Error>}
 */
async function update (req, res, next) {
  try {
    const user = req.user
    user.mobileNumber = req.body.mobileNumber
    const savedUser = await user.save()
    const sendUser = _.pick(savedUser, [ '_id', 'username', 'mobileNumber', ])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

function list (req, res, next) {
  const err = new APIError('Awesome error', httpStatus.UNAUTHORIZED)
  // res.json('OK :: user list')
  next(err)
}

async function remove (req, res, next) {
  try {
    const user = req.user
    const deletedUser = await user.remove()
    const sendUser = _.pick(deletedUser, [ '_id', 'username', 'mobileNumber', ])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  load,
  get,
  create,
  list,
  update,
  remove,
}
