'use strict';

module.exports = {
  setupFiles: ['<rootDir>/tests_config/run_spec.js'],
  snapshotSerializers: ['<rootDir>/tests_config/raw-serializer.js'],
  testRegex: 'jsfmt\\.spec\\.js$|__tests__/.*\\.js$',
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: ['src/**/*.js', '!<rootDir>/node_modules/'],
  testEnvironment: 'node',
  transform: {},
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
