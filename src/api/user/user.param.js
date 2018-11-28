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
}
