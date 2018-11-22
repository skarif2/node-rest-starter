const winston = require('winston')
// const DailyRotateFile = require('winston-daily-rotate-file')

const env = require('./environment')

// winston.addColors({
//   silly: 'magenta',
//   debug: 'blue',
//   verbose: 'cyan',
//   info: 'green',
//   warn: 'yellow',
//   error: 'red',
// })

// winston.remove(winston.transports.Console)

// winston.add(winston.transports.Console, {
//   level: env.LOG_LEVEL,
//   prettyPrint: true,
//   colorize: true,
//   silent: false,
//   timestamp: true,
// })

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
})

module.exports = logger
