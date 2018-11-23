const express = require('express')
const userRoutes = require('./user/user.route')
const authRoutes = require('./auth/auth.route')

const router = express.Router()

/**
 * @api {get} /api Check Api Availability
 * @apiName Health Check
 * @apiGroup API
 *
 * @apiParam none
 *
 * @apiSuccess {String} 'OK' Success Response
 * @apiError {Object} error Error Response
 */
router.get('/', (req, res) => res.send('OK'))

/**
 * @apiDescription Mounts user routes at /users
 * @apiGroup User
 */
router.use('/users', userRoutes)

/**
 * @apiDescription Mounts auth routes at /auth
 * @apiGroup Auth
 */
router.use('/auth', authRoutes)

module.exports = router
