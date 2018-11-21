'use strict'

// async/await can be used.
describe('user specs', () => {
  describe('check substraction', () => {
    it('works with async/await', async () => {
      const data = await (2 - 1)
      expect(data).toEqual(1)
    })
  }) 
})