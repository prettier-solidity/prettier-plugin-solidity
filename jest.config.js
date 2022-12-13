const TEST_STANDALONE = Boolean(process.env.TEST_STANDALONE);

module.exports = {
  runner: 'jest-light-runner',
  setupFiles: ['<rootDir>/tests/config/setup.js'],
  snapshotSerializers: [
    'jest-snapshot-serializer-raw',
    'jest-snapshot-serializer-ansi'
  ],
  testEnvironment: 'node',
  // ignore console warnings in TEST_STANDALONE
  silent: TEST_STANDALONE,
  testPathIgnorePatterns: TEST_STANDALONE
    ? [
        // Standalone mode doesn't have default options.
        // This has been reported https://github.com/prettier/prettier/issues/11107
        'tests/format/RespectDefaultOptions'
      ]
    : [],
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
