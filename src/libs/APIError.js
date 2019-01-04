/**
 * Create instance of Error with stack trace
 * @param {String} message error message
 * @param {String} status status code for error
 * @param {String} isPublic is error response/message public
 */
function APIError (message, status = 500, isPublic = false) {
  const instance = new Error(message)
  instance.status = status
  instance.isPublic = isPublic
  instance.isOperational = true
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  Error.stackTraceLimit = 10
  Error.captureStackTrace(instance, APIError)
  return instance
}

/**
 * Set APIError prototype
 */
APIError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

/**
 * Make Error a prototype of APIError
 */
Object.setPrototypeOf(APIError, Error)

module.exports = APIError
