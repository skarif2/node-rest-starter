/**
 * Prettify every error log
 */
const prettyError = require('./config/prettyerror')
prettyError.start()

const chalk = require('chalk')
const env = require('./config/environment')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

const log = console.log

mongoose.connection.on('connected', () => {
  log(chalk.yellow('\nConnected to MongoDB!'))
  log(chalk.green(`\n[[ Server starting >_ ]]`))
  app.listen(env.PORT, () => {
    log(chalk.red(`\n${chalk.bold(env.APP_NAME)} has started!`))
    log('-----------------------------')
    log(`Environment:\t${chalk.underline.bold(env.NODE_ENV)}`)
    log(`Port:\t${env.PORT}`)
    log(`Base Url:\thttp://localhost:${env.PORT}/api`)
    log(`Mongo Uri:\t${env.MONGO_URI}${env.MONGO_DBNAME}`)
    log(`DB Name:\t${env.MONGO_DBNAME}`)
    log('')
  })
})
