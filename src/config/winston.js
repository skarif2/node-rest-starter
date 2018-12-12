const fs = require('fs')
const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

const env = require('./environment')
const logdir = '__logs__'

let logger

/**
 * Create logger instance for perticular env
 */
if (env.nodeEnv !== 'prod') {
  logger = createLogger({
    level: env.logLevel,
    transports: [
      new transports.Console()
    ],
    format: format.prettyPrint()
  })
} else {
  if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir)
  }
  logger = createLogger({
    transports: [
      new transports.Console({
        level: env.logLevel,
        handleExceptions: true,
        json: true,
        colorize: true
      }),
      new transports.DailyRotateFile({
        level: 'info',
        handleExceptions: true,
        prepend: true,
        dirname: logdir,
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '15d',
        timestamp: true,
        json: false,
        humanReadableUnhandledException: true
      })
    ]
  })
  logger.stream = {
  /**
   * writes streams to file
  * @param {String} message stream to write
   */
    write: message => logger.info(message.trim())
  }
}

module.exports = logger
