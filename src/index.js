/**
 * Prettify every error log
 */
const prettyError = require('./config/prettyerror')
prettyError.start()

const chalk = require('chalk')
const env = require('./config/environment')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

if (env.NODE_ENV !== 'test') {
  const log = console.log
  mongoose.connection.on('connected', () => {
    log(chalk.green.bold('\nconnected to mongodb'))
    app.listen(env.PORT, () => {
      log(chalk.green(`\n${chalk.bold(env.APP_NAME)} has started!`))
      log('-----------------------------')
      log(`Environment:\t${chalk.bold(env.NODE_ENV)}`)
      log(`Port:\t\t${chalk.bold(env.PORT)}`)
      log(`Base Url:\t${chalk.bold(`http://localhost:${env.PORT}/api`)}`)
      log(`Mongo Uri:\t${chalk.bold(`${env.MONGO_URI}${env.MONGO_DBNAME}`)}`)
      log(`DB Name:\t${chalk.bold(env.MONGO_DBNAME)}`)
      log('')
    })
  })
}

module.exports = app
