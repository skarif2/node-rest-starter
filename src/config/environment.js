const Validator = require('fastest-validator')
const dotenv = require('dotenv').config()
const v = new Validator()

/**
 * Error on unsuccessful loading of .env
 */
if (dotenv.error) {
  throw new Error(`Problem loading .env file: ${dotenv.error.message}`)
}

/**
 * Validation schema for .env
 */
const schema = {
  'APP_NAME': { type: 'string', max: 20 },
  'APP_ENV': { type: 'enum', values: ['dev', 'prod', 'test', 'stage'] },
  'APP_PORT': { type: 'string', min: 4, max: 5 },
  'MONGO_HOST': { type: 'string' },
  'MONGO_DEBUG': { type: 'enum', values: ['true', 'false'] },
  'JWT_SECRET': { type: 'string' }
}

const value = v.validate(process.env, schema)

if (value !== true) {
  throw new Error(`.env validation error: ${value}`)
}

/**
 * Const to contain validated env vers
 */
const env = {
  app: {
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    port: process.env.APP_PORT
  },
  mongo: {
    host: process.env.MONGO_HOST,
    debug: process.env.MONGO_DEBUG
  },
  jwtSecret: process.env.JWT_SECRET
}

module.exports = env
