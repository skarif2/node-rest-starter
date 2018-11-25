const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { Stream, } = require('stream')
const validator = require('express-validator')

const env = require('./environment')
const { logger, } = require('./winston')
const prettyError = require('./prettyerror')
const routes = require('../src/index.route')

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
  app.use(morgan('dev', {
    stream,
  }))
}

app.use(helmet())
app.use(cors())

prettyError.instance.start()

/**
 * @apiDescription Mounts api routes at /api
 * @apiGroup API
 */
app.use('/api', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found!')
  return next(err)
})

module.exports = app
