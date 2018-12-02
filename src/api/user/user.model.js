const Promise = require('bluebird')
const mongoose = require('mongoose')

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

/**
 * Methods
 */
UserSchema.method({
})

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get User
   * @param {ObjectId} id - _id of user
   * @returns {Promise<User, Error>}
   */
  async get (id) {
    const user = await this.findById(id).exec()
    if (user) {
      return user
    }
    const err = new Error('No such user exists!')
    return Promise.reject(err)
  },

  /**
   * List users in decending order of 'createdAt' timestamp
   * @param {number} skip - Number of users to be skipped
   * @param {number} limit - Limit number of users to be returned
   * @returns {Promise<User[], Error>}
   */
  async list ({ skip = 0, limit = 50, } = {}) {
    const users = await this.find()
      .select('-password')
      .sort({ createdAt: -1, })
      .skip(+skip)
      .limit(+limit)
      .exec()
    return users
  },
}

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema)
