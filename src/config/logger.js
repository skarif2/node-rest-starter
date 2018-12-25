const _ = require('lodash')
const chalk = require('chalk')
const consola = require('consola')
const onFinished = require('on-finished')

module.exports = (app) => {
  const originalSend = app.response.send
  app.response.send = function send (body) {
    originalSend.call(this, body)
    this.resBody = body
  }
  app.use(function (req, res, next) {
    var start = process.hrtime()
    onFinished(res, (err, res) => {
      var diff = process.hrtime(start)
      var responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2)
      if (!err) {
        const requestObj = _.pick(req, ['headers', 'params', 'query', 'body'])
        const responseObj = { statusCode: res.statusCode }

        try {
          responseObj.body = JSON.parse(res.resBody)
        } catch (e) {
          responseObj.body = res.resBody
        }

        consola.log('\n')
        consola.info('req:', requestObj)
        consola.info('res:', responseObj)

        // Express style logging
        // consola.info(`req: ${util.inspect(requestObj, false, null, true)}`)
        // consola.info(`res: ${util.inspect(responseObj, false, null, true)}`)

        if (res.statusCode >= 400 && res.statusCode < 500) {
          consola.warn(responseObj.body)
        } else if (res.statusCode >= 500) {
          consola.error(responseObj.body)
        }

        consola.log(`${getRequestColor(res.statusCode, req.httpVersion)} ${
          getMethodColor(req.method)} ${chalk.white(req.originalUrl)} - ${
          getStatusColor(res.statusCode)} - ${responseTime} ms`)
      }
    })
    next()
  })

  const getRequestColor = (status, httpVersion) => {
    if (status < 300) {
      return chalk.black.bgHex('#28cb91')(` HTTP-${httpVersion} `)
    } else if (status >= 300 && status < 400) {
      return chalk.black.bgHex('#52aefa')(` HTTP-${httpVersion} `)
    } else if (status >= 400 && status < 500) {
      return chalk.black.bgHex('#ff9f44')(` HTTP-${httpVersion} `)
    }
    return chalk.black.bgHex('#ff4047')(` HTTP-${httpVersion} `)
  }

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return chalk.hex('#52aefa').bold('GET')
      case 'POST':
        return chalk.hex('#28cb91').bold('POST')
      case 'PUT':
        return chalk.hex('#ff9f44').bold('PUT')
      case 'PATCH':
        return chalk.hex('#ff9f44').bold('PATCH')
      case 'DELETE':
        return chalk.hex('#ff4047').bold('DELETE')
      default:
        return chalk.hex('#52aefa').bold(method)
    }
  }

  const getStatusColor = (status) => {
    if (status < 300) {
      return chalk.hex('#28cb91')(status)
    } else if (status >= 300 && status < 400) {
      return chalk.hex('#52aefa')(status)
    } else if (status >= 400 && status < 500) {
      return chalk.hex('#ff9f44')(status)
    }
    return chalk.hex('#ff4047')(status)
  }
}
