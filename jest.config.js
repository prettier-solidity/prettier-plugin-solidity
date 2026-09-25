const TEST_STANDALONE_BROWSER = Boolean(process.env.TEST_STANDALONE_BROWSER);
const TEST_STANDALONE =
  Boolean(process.env.TEST_STANDALONE) || TEST_STANDALONE_BROWSER;
const testMatch = ['<rootDir>/tests/format/**/format.test.js'];
const testPathIgnorePatterns = [];

if (TEST_STANDALONE) {
  testMatch.push('<rootDir>/tests/integration/**/*.test.js');
  testPathIgnorePatterns.push(
    TEST_STANDALONE_BROWSER
      ? '<rootDir>/tests/integration/test-app/node.test.js'
      : '<rootDir>/tests/integration/test-app/browser.test.js'
  );
} else {
  testMatch.push('<rootDir>/tests/unit/**/*.test.js');
}

const globalSetup = TEST_STANDALONE_BROWSER
  ? '<rootDir>/tests/config/browser-standalone-global-setup.js'
  : undefined;
const globalTeardown = TEST_STANDALONE_BROWSER
  ? '<rootDir>/tests/config/browser-standalone-global-teardown.js'
  : undefined;

export default {
  runner: 'jest-light-runner',
  setupFiles: ['<rootDir>/tests/config/format-test-setup.js'],
  globalSetup,
  globalTeardown,
  snapshotSerializers: [
    'jest-snapshot-serializer-raw',
    'jest-snapshot-serializer-ansi'
  ],
  // ignore console warnings in TEST_STANDALONE
  silent: TEST_STANDALONE,
  testMatch,
  testPathIgnorePatterns,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
