const chalk = require('chalk')
const moment = require('moment')
const env = require('./config/environment')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

const log = console.log

mongoose.connection.on('connected', () => {
  log('')
  log(chalk.yellow('Connected to MongoDB!'))
  log('')
  log(chalk.green(`[[ Server starting at ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')} >_ ]]`))

  app.listen(env.PORT, () => {
    log('')
    log(chalk.red(`${chalk.bold(env.APP_NAME)} v${env.APP_VERSION} started!`))
    log('-----------------------------')
    log(`Environment:\t${chalk.underline.bold(env.NODE_ENV)}`)
    log(`IP:\t\t${env.IP}`)
    log(`Port:\t\t${env.PORT}`)
    log(`Base Url:\thttp://${env.IP}:${env.PORT}/api`)
    log(`Mongo Uri:\t${env.MONGO_URI}${env.MONGO_DBNAME}`)
    log(`DB Name:\t${env.MONGO_DBNAME}`)
    log('')
  })
})
