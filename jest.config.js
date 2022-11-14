const TEST_STANDALONE = Boolean(process.env.TEST_STANDALONE);

module.exports = {
  moduleNameMapper: {
    '^prettier$': TEST_STANDALONE
      ? '<rootDir>/node_modules/prettier/standalone'
      : '<rootDir>/node_modules/prettier'
  },
  runner: 'jest-light-runner',
  setupFiles: ['<rootDir>/tests/config/setup.js'],
  snapshotSerializers: [
    'jest-snapshot-serializer-raw',
    'jest-snapshot-serializer-ansi'
  ],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/format/**/jsfmt.spec.js',
    '<rootDir>/tests/unit/**/*.js'
  ],
  transform: {},
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
