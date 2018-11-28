const Joi = require('joi')

module.exports = {
  /**
   * @apiName Create User
   * @apiGroup User
   */
  create: {
    body: {
      username: Joi.string().required(),
      mombileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      password: Joi.string().required(),
    },
  },

  /**
   * @apiName Get User
   * @apiGroup User
   */
  get: {
    headers: {
      authorization: Joi.string().required(),
    },
    params: {
      userId: Joi.string().required(),
    },
  },

  /**
   * @apiName Update User
   * @apiGroup User
   */
  update: {
    headers: {
      authorization: Joi.string().required(),
    },
    params: {
      userId: Joi.string().required(),
    },
    body: {
      mombileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      password: Joi.string().required(),
    },
  },

  /**
   * @apiName Delete User
   * @apiGroup User
   */
  remove: {
    headers: {
      authorization: Joi.string().required(),
    },
    params: {
      userId: Joi.string().required(),
    },
  },
}
