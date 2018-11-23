const { Router, } = require('express')
const validate = require('express-validation')
const userParam = require('./user.param')
const userCtrl = require('./user.controller')

const router = Router()

router.route('/')
  /**
   * @api {get} /api/users Get list of users
   * @apiName User List
   * @apiGroup User
   *
   * @apiParam none
   *
   * @apiSuccess {Array} users List of users
   * @apiError {Object} error Error response
   */
  .get(userCtrl.list)

  /**
   * @api {post} /api/users Create new user
   * @apiName Create User
   * @apiGroup User
   *
   * @apiParam (body) {String} username Username of user
   * @apiParam (body) {String} mobileNumber Mobile number of user
   * @apiParam (body) {String} password Password of user
   *
   * @apiSuccess {Object} users List of users
   * @apiError {Object} error Error response
   */
  .post(validate(userParam.create), userCtrl.create)

module.exports = router
