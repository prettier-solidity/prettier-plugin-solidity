module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/generateIndexes.js',
    'src/**/*.js',
    '!<rootDir>/node_modules/',
    '!src/prettier-comments/**/*.js'
  ],
  coverageDirectory: './coverage/',
  setupFiles: ['<rootDir>/tests_config/run_spec.js'],
  snapshotSerializers: ['<rootDir>/tests_config/raw-serializer.js'],
  testEnvironment: 'node',
  testRegex: 'jsfmt\\.spec\\.js$|__tests__/.*\\.js$|scripts/.*\\.test\\.js$',
  transform: {},
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
