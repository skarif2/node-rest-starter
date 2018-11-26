const fs = require('fs')
const winston = require('winston')
require('winston-daily-rotate-file')
require('winston-loggly-bulk')

const env = require('./environment')
const logdir = '__logs__'

const transports = []

/**
 * Add Console Transport
 */
transports.push(new winston.transports.Console({
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
  transports.push(new winston.transports.DailyRotateFile({
    dirname: logdir,
    filename: 'info-%DATE%.log',
    level: env.LOG_LEVEL_FILE,
    timestamp: true,
    json: false,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '15d',
  }))

  transports.push(new winston.transports.DailyRotateFile({
    dirname: logdir,
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
 * Create logger instance
 */
const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  transports: transports,
  exitOnError: false,
})

/**
 * Add Loggly Transport (https://www.loggly.com/)
 */
// if (env.NODE_ENV === 'prod') {
//   logger.add(window.transports.Loggly, {
//     inputToken: env.LOGGLY_INPUT_TOKEN,
//     subdomain: env.LOGGLY_SUBDOMAIN,
//     tags: [ 'node-rest-starter', ],
//     json: true,
//   })
// }

module.exports = {
  logger,
}
