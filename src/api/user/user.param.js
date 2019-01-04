const Joi = require('joi')

module.exports = {
  /**
   * @apiName Create User
   * @apiGroup User
   */
  create: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  /**
   * @apiName Get User
   * @apiGroup User
   */
  get: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      userId: Joi.string().required()
    }
  },

  /**
   * @apiName Update User
   * @apiGroup User
   */
  update: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      userId: Joi.string().required()
    },
    body: {
      mobileNumber: Joi.string().required()
    }
  },

  /**
   * @apiName List Users
   * @apiGroup User
   */
  list: {
    query: {
      skip: Joi.string(),
      limit: Joi.string()
    }
  },

  /**
   * @apiName Delete User
   * @apiGroup User
   */
  remove: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      userId: Joi.string().required()
    }
  }
}
