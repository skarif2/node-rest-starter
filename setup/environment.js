const Joi = require('joi')
const env = require('dotenv').config()

console.log(Error)

// Error on unsuccessful loading of .env
if (env.error) {
  throw new Error(`Problem loading .env file: ${env.error.message}`)
}

// Validation schema for .env
const schema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['dev', 'prod', 'test', 'stage'])
    .default('test'),
  PORT: Joi.number()
    .default(9100)
}).unknown(false)
  .required()

const { error, value } = Joi.validate(env.parsed, schema)

if (error) {
  throw new Error(`.env validation error: ${error.message}`)
}

module.exports = value
