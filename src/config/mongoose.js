const chalk = require('chalk')
const mongoose = require('mongoose')
const util = require('util')
const debug = require('debug')('node-rest-starter:index')

const env = require('./environment')
const log = console.log

/**
 * make bluebird default Promise
 */
Promise = require('bluebird') // eslint-disable-line no-global-assign

/**
 * plugin bluebird promise in mongoose
 */
mongoose.Promise = Promise

/**
 * set Username and Password of user
 * enable 'useCreateIndex' for mongoose
 */
const mongoOption = {
  dbName: env.MONGO_DBNAME,
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}

/**
 * connect to mongo db
 */
const mongoUri = env.MONGO_URI
log(chalk.green(`[[ Connecting to Mongo ${mongoUri}${mongoOption.dbName} >_ ]]`))
mongoose.connect(mongoUri, mongoOption)
mongoose.connection.on('error', (err) => {
  log(chalk.red('Mongo connection error'), err)
  throw new Error(`Unable to connect to database: ${mongoUri}`)
})

/**
 * print mongoose logs in dev env
 */
if (env.MONGO_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

module.exports = mongoose
