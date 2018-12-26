'use strict'

const rewire = require('rewire')
const chalk = require('chalk')
const logger = rewire('../config/logger')

describe('logger specs', () => {
  describe('getStatusColor specs', () => {
    const getStatusColor = logger.__get__('getStatusColor')
    test('sould return green colord status', () => {
      const data = getStatusColor(200)
      expect(data).toEqual(chalk.green(200))
    })
    test('sould return blue colord status', () => {
      const data = getStatusColor(300)
      expect(data).toEqual(chalk.blue(300))
    })
    test('sould return yellow colord status', () => {
      const data = getStatusColor(400)
      expect(data).toEqual(chalk.yellow(400))
    })
    test('sould return red colord status', () => {
      const data = getStatusColor(500)
      expect(data).toEqual(chalk.red(500))
    })
  })
  describe('getRequestColor specs', () => {
    const getRequestColor = logger.__get__('getRequestColor')
    const httpVersion = '1.1'
    test('sould return green colord http version', () => {
      const data = getRequestColor(200, httpVersion)
      expect(data).toEqual(chalk.black.bgGreen(` HTTP-${httpVersion} `))
    })
    test('sould return blue colord http version', () => {
      const data = getRequestColor(300, httpVersion)
      expect(data).toEqual(chalk.black.bgBlue(` HTTP-${httpVersion} `))
    })
    test('sould return yellow colord http version', () => {
      const data = getRequestColor(400, httpVersion)
      expect(data).toEqual(chalk.black.bgYellow(` HTTP-${httpVersion} `))
    })
    test('sould return red colord http version', () => {
      const data = getRequestColor(500, httpVersion)
      expect(data).toEqual(chalk.black.bgRed(` HTTP-${httpVersion} `))
    })
  })
  describe('getMethodColor specs', () => {
    const getMethodColor = logger.__get__('getMethodColor')
    test('sould return green colord method', () => {
      const data = getMethodColor('GET')
      expect(data).toEqual(chalk.green.bold('GET'))
    })
    test('sould return yellow colord method', () => {
      const data = getMethodColor('POST')
      expect(data).toEqual(chalk.yellow.bold('POST'))
    })
    test('sould return blue colord method', () => {
      const data = getMethodColor('PUT')
      expect(data).toEqual(chalk.blue.bold('PUT'))
    })
    test('sould return red colord method', () => {
      const data = getMethodColor('DELETE')
      expect(data).toEqual(chalk.red.bold('DELETE'))
    })
  })
  describe('log specs', () => {
    const log = logger.__get__('log')
    test('should return without error', () => {
      const req = {
        method: 'GET',
        httpVersion: '1.1',
        originalUrl: '/tests'
      }
      const data = log(req, { statusCode: 200 }, {}, {})
      expect(data instanceof Error).toBeFalsy()
    })
  })
})
