const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const crossdomain = require('helmet-crossdomain')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { Stream, } = require('stream')
const validation = require('express-validation')
const expressWinston = require('express-winston')

const env = require('./environment')
const logger = require('./winston')
const routes = require('../index.route')
const APIError = require('../libs/APIError')

const app = express()

app.use(compression())
app.set('port', env.PORT)

app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

app.use(methodOverride())

app.use(cookieParser())

if (env.NODE_ENV === 'dev') {
  let stream = new Stream()
  stream.writable = true
  stream.write = data => logger.debug(data)
  app.use(morgan('dev', { stream, }))
}

app.use(cors())

/**
 * Use helmet to secure Express headers
 */
app.use(crossdomain())
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.frameguard())
app.use(helmet.ieNoOpen())
app.use(helmet.hidePoweredBy())

/**
 * Enable detailed API logging in all env except test
 */
if (env.NODE_ENV !== 'test') {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }))
}

/**
 * If error is not an instanceOf APIError, convert it.
 */
app.use((err, req, res, next) => {
  if (err instanceof validation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ')
    const error = new APIError(unifiedErrorMessage, err.status, true)
    return next(error)
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic)
    return next(apiError)
  }
  return next(err)
})

/**
 * Mounts api routes at /api
 */
app.use('/api', routes)

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = new Error('API not found!')
  return next(err)
})

module.exports = app
