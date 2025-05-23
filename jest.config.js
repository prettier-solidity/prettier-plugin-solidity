const TEST_STANDALONE = Boolean(process.env.TEST_STANDALONE);
const testMatch = ['<rootDir>/tests/format/**/format.test.js'];

if (TEST_STANDALONE) {
  testMatch.push('<rootDir>/tests/integration/**/*.test.js');
} else {
  testMatch.push('<rootDir>/tests/unit/**/*.test.js');
}

export default {
  runner: 'jest-light-runner',
  setupFiles: ['<rootDir>/tests/config/format-test-setup.js'],
  snapshotSerializers: [
    'jest-snapshot-serializer-raw',
    'jest-snapshot-serializer-ansi'
  ],
  // ignore console warnings in TEST_STANDALONE
  silent: TEST_STANDALONE,
  testPathIgnorePatterns: TEST_STANDALONE
    ? [
        // Standalone mode doesn't have default options.
        // This has been reported https://github.com/prettier/prettier/issues/11107
        'tests/format/RespectDefaultOptions'
      ]
    : [],
  testMatch,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
