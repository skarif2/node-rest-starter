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
const prettyError = require('./prettyerror')

const app = express()

prettyError.instance.start()

if (env.NODE_ENV === 'prod') {
  app.use(morgan('tiny', {
    stream: winstonInstance.stream,
  }))
} else {
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(methodOverride())

// enable detailed API logging in dev env
if (env.NODE_ENV !== 'test') {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }))
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found!')
  return next(err)
})

module.exports = app
