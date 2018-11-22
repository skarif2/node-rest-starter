const express = require('express')

const router = express.Router()

/**
 * @api {get} / Check Api Availability
 * @apiName Health Check
 * @apiGroup Root
 *
 * @apiParam none
 *
 * @apiSuccess {String} 'OK' Success Response
 * @apiError {Object} error Error Response
 */
router.get('/', (req, res) => res.send('OK'))

module.exports = router
