const consola = require('consola')
const app = require('./config/express')
const env = require('./config/environment')
const mongoose = require('./config/mongoose')

/**
 * Start application if not running test
 */
if (env.app.env !== 'test') {
  mongoose.connection.on('connected', () => {
    consola.ready({
      message: 'MongoDB',
      badge: true
    })
    app.listen(env.app.port, () => {
      consola.ready({
        message: `${env.app.name} Server`,
        badge: true
      })
      consola.log('-------------------------------------------------')
      consola.info(`Environment: ${env.app.env}`)
      consola.info(`Port: ${env.app.port}`)
      consola.info(`Base uri: http://localhost:${env.app.port}/api`)
      consola.info(`Mongo uri: ${env.mongo.host}`)
    })
  })
}

module.exports = app
