const chalk = require('chalk')
const moment = require('moment')
const env = require('./config/environment')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

const log = console.log

mongoose.connection.on('connected', () => {
  log(chalk.yellow('\nConnected to MongoDB!'))
  log(chalk.green(`\n[[ Server starting at ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')} >_ ]]`))
  app.listen(env.PORT, () => {
    log(chalk.red(`\n${chalk.bold(env.APP_NAME)} v${env.APP_VERSION} started!`))
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
