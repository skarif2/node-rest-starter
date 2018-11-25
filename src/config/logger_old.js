const fs = require('fs')
const { createLogger, format, transports, } = require('winston')
const { prettyPrint, } = format
require('winston-daily-rotate-file')

const env = require('./environment')
const logdir = '__logs__'

let logger

if (env.NODE_ENV !== 'prod') {
  logger = createLogger({
    level: env.LOG_LEVEL,
    transports: [
      new transports.Console(),
    ],
    format: prettyPrint(),
  })
} else {
  if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir)
  }
  logger = createLogger({
    transports: [
      new transports.Console({
        level: env.LOG_LEVEL,
        handleExceptions: true,
        json: true,
        colorize: true,
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
      }),
    ],
  })
  logger.stream = {
    write: message => logger.info(message.trim()),
  }
}

module.exports = logger
