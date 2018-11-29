const Promise = require('bluebird')
const { Schema, model, } = require('mongoose')

/**
 * User Schema
 */
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [ /^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.', ],
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
UserSchema.methods({})

/**
 * Statics
 */
UserSchema.statics({
  /**
   * Get User
   * @param {ObjectId} id - _id of user
   * @returns {Promise<User, Error>}
   */
  async get (id) {
    const result = await this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user
        }
        const err = new Error('No such user exists!')
        return Promise.reject(err)
      })
    return result
  },

  /**
   * List users in decending order of 'createdAt' timestamp
   * @param {number} skip - Number of users to be skipped
   * @param {number} limit - Limit number of users to be returned
   * @returns {Promise<User[], Error>}
   */
  async list ({ skip = 0, limit = 50, } = {}) {
    const result = await this.find()
      .sort({ createdAt: -1, })
      .skip(+skip)
      .limit(+limit)
      .exec()
    return result
  },
})

/**
 * @typedef User
 */
module.exports = model('User', UserSchema)
