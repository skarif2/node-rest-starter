'use strict'

const testHelper = require('../helpers/TESTHelper')

// async/await can be used.
describe('misc specs', () => {
  describe('check addition', () => {
    it('works with async/await', async () => {
      const data = await testHelper.addition(1, 2)
      expect(data).toEqual(3)
    })
  })
})
