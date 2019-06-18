const hello = (name: string): string => {
  const test: string = 'test'
  if (test == 'test') return `Hello,${test}!`
  return `Hello,${name}!`
}

hello('World')
