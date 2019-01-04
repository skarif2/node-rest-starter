const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const methodOverride = require('method-override')
const validation = require('express-validation')
const httpStatus = require('http-status')
const logger = require('@skarif2/logger')

const env = require('./environment')
const routes = require('../index.route')
const APIError = require('../libs/APIError')

const app = express()

/**
 * Set application port to listen to
 */
app.set('port', env.port)

/**
 * Middleware to compress respose bodies
 */
app.use(compression())

/**
 * Middleware to parese req.body data
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * Log request details to console
 */
if (env.nodeEnv !== 'test') {
  app.use(logger())
}

/**
 * Enables HTTP verbs such as PUT or DELETE in places
 * where the client doesn't support it
 */
app.use(methodOverride())

/**
 * Enables cross-origin resource sharing
 */
app.use(cors())

/**
 * Use helmet to secure Express headers
 */
app.use(helmet())

/**
 * Mounts api routes at /api
 */
app.use('/api', routes)

/**
 * If error is not an instanceOf APIError, convert it.
 */
app.use((err, req, res, next) => {
  if (err instanceof validation.ValidationError) {
    // ValidationError is an array of error
    const messages = err.errors.map(error => error.messages.join('. ')).join(' and ')
    const error = new APIError(messages, err.status, true)
    return next(error)
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic)
    return next(apiError)
  }
  return next(err)
})

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = new APIError('API not found!', httpStatus.NOT_FOUND, false)
  return next(err)
})

/**
 * error handler, send stacktrace only during development
 */
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: env.nodeEnv === 'dev' ? err.stack : {}
  })
})

module.exports = app
