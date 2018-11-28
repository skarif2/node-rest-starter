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
const validator = require('express-validator')
const expressWinston = require('express-winston')

const env = require('./environment')
const { logger, } = require('./winston')
const routes = require('../index.route')

const app = express()

app.use(compression())
app.set('port', env.PORT)

app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

app.use(validator())
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

// enable detailed API logging in all env except test
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
