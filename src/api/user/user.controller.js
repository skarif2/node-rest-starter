const _ = require('lodash')
const bcrypt = require('bcryptjs')
const httpStatus = require('http-status')

const User = require('./user.model')
const APIError = require('../../libs/APIError')

const salt = bcrypt.genSaltSync(10)
/**
 * Load user and append to req object
 */
async function load (req, res, next, id) {
  try {
    req.user = await User.get({ '_id': id })
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
  const sendUser = _.pick(user, ['_id', 'username', 'mobileNumber'])
  return res.json(sendUser)
}

/**
 * Create new user
 * @property {string} req.body.username username of user
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @property {string} req.body.password password of user
 * @returns {<User, Error>}
 */
async function create (req, res, next) {
  try {
    const user = new User({
      username: req.body.username,
      mobileNumber: req.body.mobileNumber,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    const savedUser = await user.save()
    const sendUser = _.pick(savedUser, ['_id', 'username', 'mobileNumber'])
    return res.json(sendUser)
  } catch (e) {
    let err = e
    if (err.code && err.code === 11000) {
      err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
    }
    return next(err)
  }
}

/**
 * Update user
 * @property {string} req.params.userId _id of user
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @returns {<User, Error>}
 */
async function update (req, res, next) {
  try {
    const user = req.user
    user.mobileNumber = req.body.mobileNumber
    const savedUser = await user.save()
    const sendUser = _.pick(savedUser, ['_id', 'username', 'mobileNumber'])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

/**
 * List users
 * @property {string} req.params.limit number of users to be listed
 * @property {string} req.params.skip number of users to be skipped
 * @returns {<User[], Error>}
 */
async function list (req, res, next) {
  try {
    const users = await User.list(req.query)
    return res.json(users)
  } catch (e) {
    next(e)
  }
}

/**
 * Delete user
 * @property {string} req.params.userId _id of user
 * @returns {<User, Error>}
 */
async function remove (req, res, next) {
  try {
    const user = req.user
    const deletedUser = await user.remove()
    const sendUser = _.pick(deletedUser, ['_id', 'username', 'mobileNumber'])
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
  remove
}
