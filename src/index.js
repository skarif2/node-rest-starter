/**
 * Prettify every error log
 */
const prettyError = require('./config/prettyerror')
prettyError.start()

const chalk = require('chalk')
const chokidar = require('chokidar')
const env = require('./config/environment')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

/**
 * Enable hot-reloading if node env is dev
 */
if (env.nodeEnv === 'dev') {
  const watcher = chokidar.watch('./src')
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log(chalk.magenta('hot-reload - clearing cache...'))
      Object.keys(require.cache).forEach((id) => {
        if (/[\/\\]server[\/\\]/.test(id)) { // eslint-disable-line no-useless-escape
          delete require.cache[id]
        }
      })
    })
  })
}

/**
 * Start application if not running test
 */
if (env.nodeEnv !== 'test') {
  mongoose.connection.on('connected', () => {
    console.log(chalk.cyan.bold('connected to mongodb'))
    app.listen(env.port, () => {
      console.log(chalk.cyan(`${chalk.bold(env.appName)} has started!`))
      console.log('-----------------------------')
      console.log(`Environment:\t${chalk.bold(env.nodeEnv)}`)
      console.log(`Port:\t\t${chalk.bold(env.port)}`)
      console.log(`Base Url:\t${chalk.bold(`http://localhost:${env.port}/api`)}`)
      console.log(`Mongo Uri:\t${chalk.bold(env.mongo.host)}`)
      console.log('')
    })
  })
}

module.exports = app
