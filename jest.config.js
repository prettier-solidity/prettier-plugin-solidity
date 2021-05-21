const FULL_TEST = Boolean(process.env.FULL_TEST);

module.exports = {
  collectCoverage: FULL_TEST,
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/generateIndexes.js',
    'src/**/*.js',
    '!<rootDir>/node_modules/',
    '!src/prettier-comments/**/*.js'
  ],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: ['/node_modules/', '/scripts/'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFiles: ['<rootDir>/tests_config/setup.js'],
  snapshotSerializers: [
    'jest-snapshot-serializer-raw',
    'jest-snapshot-serializer-ansi'
  ],
  testEnvironment: 'node',
  testRegex: 'jsfmt\\.spec\\.js$|__tests__/.*\\.js$|scripts/.*\\.test\\.js$',
  transform: {},
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
