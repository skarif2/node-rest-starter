'use strict'

// async/await can be used.
describe('misc specs', () => {
  describe('check addition', () => {
    it('works with async/await', async () => {
      const data = await (1 + 2)
      expect(data).toEqual(3)
    })
  }) 
})
