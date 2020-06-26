import hello from '~/js/Action/alert'

test('Hello,World', () => {
  expect(hello('World')).toBe('Hello,World!')
})
