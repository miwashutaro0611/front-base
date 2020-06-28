import hello from '~/js/modules/alert'

test('Hello,World', () => {
  expect(hello('World')).toBe('Hello,World!')
})
