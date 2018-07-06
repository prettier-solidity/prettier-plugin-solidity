'use strict';

const ENABLE_COVERAGE = !!process.env.CI;

const semver = require('semver');
const isOldNode = semver.parse(process.version).major <= 4;

module.exports = {
  setupFiles: ['<rootDir>/tests_config/run_spec.js'],
  snapshotSerializers: ['<rootDir>/tests_config/raw-serializer.js'],
  testRegex: 'jsfmt\\.spec\\.js$|__tests__/.*\\.js$',
  collectCoverage: ENABLE_COVERAGE,
  collectCoverageFrom: ['src/**/*.js', '!<rootDir>/node_modules/'],
  testEnvironment: 'node',
  transform: {},
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
