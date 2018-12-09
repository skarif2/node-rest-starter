const httpStatus = require('http-status')

function APIError (message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
  const instance = new Error(message)
  instance.status = status
  instance.isPublic = isPublic
  instance.isOperational = true
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  if (Error.captureStackTrace) {
    Error.stackTraceLimit = 10
    Error.captureStackTrace(instance, APIError)
  }
  return instance
}

APIError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(APIError, Error)
} else {
  APIError.__proto__ = Error // eslint-disable-line no-proto
}

module.exports = APIError
