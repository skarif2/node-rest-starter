const fs = require('fs')
const {
  createLogger,
  transports,
} = require('winston')
require('winston-daily-rotate-file')
require('winston-loggly-bulk')

const env = require('./environment')
const logdir = '__logs__'

const transporter = []

/**
 * Add Console Transport
 */
transporter.push(new transports.Console({
  level: env.LOG_LEVEL_CONSOLE,
  colorize: true,
  prettyPrint: true,
  handleExceptions: env.NODE_ENV === 'prod',
}))

/**
 * Add File Transport
 */
if (env.NODE_ENV === 'prod') {
  if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir)
  }
  transporter.push(new transports.DailyRotateFile({
    filename: 'info-%DATE%.log',
    level: env.LOG_LEVEL_FILE,
    timestamp: true,
    json: false,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '15d',
  }))

  transporter.push(new transports.DailyRotateFile({
    filename: 'error-%DATE%.log',
    level: 'error',
    timestamp: true,
    json: false,
    prettyPrint: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '15d',
  }))
}

/**
 * Add Loggly Transport (https://www.loggly.com/)
 */
if (env.NODE_ENV === 'prod') {
  transporter.push(new transports.Loggly({
    inputToken: env.LOGGLY_INPUT_TOKEN,
    subdomain: env.LOGGLY_SUBDOMAIN,
    tags: [ 'node-rest-starter', ],
    json: true,
  }))
}

const logger = createLogger({
  level: env.LOG_LEVEL,
  transports: transporter,
  exitOnError: false,
})

module.exports = {
  logger,
}
