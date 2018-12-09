'use strict'

// async/await can be used.
describe('misc specs', () => {
  describe('additon', () => {
    test('check addition', async () => {
      const data = await (1 + 2)
      expect(data).toEqual(3)
    })
  })
})
