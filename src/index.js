/**
 * Wrap all console logs with consola
 */
const consola = require('consola')
const logger = consola.create({
  // level: 4,
  reporters: [
    new consola.JSONReporter()
  ],
  defaults: {
    additionalColor: 'white'
  }
})
/**
 * Prettify every error log
 */
const prettyError = require('./config/prettyerror')
prettyError.start()

const env = require('./config/environment')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

/**
 * Start application if not running test
 */
if (env.nodeEnv !== 'test') {
  mongoose.connection.on('connected', () => {
    logger.ready({
      message: 'MongoDB',
      badge: true
    })
    app.listen(env.port, () => {
      logger.ready({
        message: `${env.appName} Server`,
        badge: true
      })
      logger.log('-------------------------------------------------')
      logger.info(`Environment: ${env.nodeEnv}`)
      logger.info(`Port: ${env.port}`)
      logger.info(`Base uri: http://localhost:${env.port}/api`)
      logger.info(`Mongo uri: ${env.mongo.host}`)
    })
  })
}

module.exports = app
