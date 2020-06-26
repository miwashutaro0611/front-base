module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/spec/**/*.spec.ts'],
  moduleNameMapper: {
    '^~(.+)': '<rootDir>/src/assets/$1',
  },
}
