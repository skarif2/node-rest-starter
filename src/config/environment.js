const Joi = require('joi')
const env = require('dotenv').config()

// Error on unsuccessful loading of .env
if (env.error) {
  throw new Error(`Problem loading .env file: ${env.error.message}`)
}

// Validation schema for .env
const schema = Joi.object({
  APP_NAME: Joi.string()
    .default('node-rest-starter'),
  NODE_ENV: Joi.string().lowercase().trim()
    .allow([ 'dev', 'prod', 'test', 'stage', ])
    .default('dev'),
  PORT: Joi.number()
    .default(9100),
  MONGO_URI: Joi.string()
    .default('mongoose://localhost/'),
  MONGO_DBNAME: Joi.string()
    .default('node-rest-starter'),
  MONGO_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('dev'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false),
    }),
  LOG_LEVEL: Joi.string().lowercase().trim()
    .allow([ 'error', 'warn', 'info', 'verbose', 'debug', 'silly', ])
    .default('info'),
  LOG_LEVEL_FILE: Joi.string().lowercase().trim()
    .allow([ 'error', 'warn', 'info', 'verbose', 'debug', 'silly', ])
    .default('info'),
  LOG_LEVEL_CONSOLE: Joi.string().lowercase().trim()
    .allow([ 'error', 'warn', 'info', 'verbose', 'debug', 'silly', ])
    .default('info'),
  JET_SECRET: Joi.string()
    .required(true),
}).unknown(false)

const { error, value, } = Joi.validate(env.parsed, schema)

if (error) {
  throw new Error(`.env validation error: ${error.message}`)
}

module.exports = value
