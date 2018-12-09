const Joi = require('joi')

module.exports = {
  /**
   * @apiName User Login
   * @apiGroup Auth
   */
  login: {
    username: Joi.string().required(),
    password: Joi.string().required()
  }
}
