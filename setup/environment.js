const Joi = require('joi')

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const schema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['dev', 'prod', 'test', 'stage'])
    .default('dev'),
  PORT: Joi.number()
    .default(9100)
}).unknown()
  .required();

const { error, value: env } = Joi.validate(process.env, schema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT
};

module.exports = config;
