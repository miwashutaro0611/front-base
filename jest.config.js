module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/spec/**/*.spec.ts'],
  moduleNameMapper: {
    '^~(.+)': '<rootDir>/src/assets/$1',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'front-base',
        outputDirectory: 'reports/jest',
        outputName: 'js-test-results.xml',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' › ',
      },
    ],
  ],
}
