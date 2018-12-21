const { Router } = require('express')
const validate = require('express-validation')
const authParam = require('./auth.param')
const authCtrl = require('./auth.controller')

const router = Router()

router.route('/login')
  /**
   * @api {post} /api/auth/login User Login
   * @apiName User Login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam (body) {String} username Username of user
   * @apiParam (body) {String} password Password of user
   *
   * @apiSuccess {String} token JWT token
   * @apiError {Object} error Error response
   */
  .post(validate(authParam.login), authCtrl.login)

module.exports = router
