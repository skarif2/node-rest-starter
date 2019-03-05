const mongoose = require('mongoose')
const util = require('util')
const debug = require('debug')('node-rest-starter:index')
const env = require('./environment')

/**
 * plugin bluebird promise in mongoose
 */
mongoose.Promise = require('bluebird')

/**
 * set Username and Password of user
 * enable 'useCreateIndex' for mongoose
 */
const mongoOption = {
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false
}

/**
 * connect to mongo db
 */
mongoose.connect(env.mongo.host, mongoOption)
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${env.mongo.host}`)
})

/**
 * print mongoose logs in dev env
 */
if (env.mongo.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

module.exports = mongoose
