const joi = require('joi')

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .valid('development', 'production', 'test', 'provision')
    .required(),
  PORT: joi.number()
    .required(),
  LOGGER_LEVEL: joi.string()
    .valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

// joi 16 removed the standalone `joi.validate(value, schema)` in favour of
// calling validate() on the schema, and stopped accepting an array of
// allowed values in `.valid()` - they are passed as separate arguments now.
// Written the old way, this sample throws before it validates anything.
const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  },
  server: {
    port: envVars.PORT
  }
  // ...
}

module.exports = config;
