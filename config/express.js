const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
// const httpStatus = require('http-status')
const morgan = require('morgan')
const methodOverride = require('method-override')
// const validation = require('express-validation')
const expressWinston = require('express-winston')

const env = require('./environment')
const winstonInstance = require('./logger')
const routes = require('./router')

require('pretty-error').start()

const app = express()

if (env.NODE_ENV === 'dev') {
  app.use(morgan('dev'))
} else if (env.NODE_ENV === 'stage') {
  app.use(morgan('tiny'))
}

app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(methodOverride())

if (env.NODE_ENV === 'dev') {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true,
  }))
}

app.use('/api', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found!')
  return next(err)
})

// log error in winston transports except when executing test suite
if (env.NODE_ENV !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance,
  }))
}

module.exports = app
