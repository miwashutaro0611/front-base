import hello from '../assets/js/Action/alert'

test('Hello,World', () => {
  expect(hello('World')).toBe('Hello,World!')
})
