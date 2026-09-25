import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImportX from 'eslint-plugin-import-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Most of tests/config/ is copied from Prettier's own test setup with light
// modifications; we don't want to maintain those to our lint standards.
// These files, though, are fully authored by us, so we lint them.
const authoredTestConfigFiles = [
  'browser-standalone-global-setup.js',
  'browser-standalone-global-teardown.js',
  'browser-standalone-server.js',
  'browser-standalone-state.js',
  'compile-contract.js',
  'constants.js',
  'get-browser-prettier.js',
  'get-create-parser.js',
  'get-plugins.js',
  'get-prettier.js',
  'get-runtime-browser.js',
  'get-variant-coverage.js',
  'static-server.js',
  'test-bytecode-compare.js',
  'test-variant-coverage.js'
];

export default defineConfig([
  globalIgnores([
    'coverage/**/*.js',
    'dist/**/*.cjs',
    'dist/**/*.js',
    'tests/**/*.snap',
    'tests/format/**/*.sol',
    'tests/format/Markdown/Markdown.md',
    'tests/format/RespectDefaultOptions/respect-default-options.js',
    'tests/config/**/*.*js',
    ...authoredTestConfigFiles.map((file) => `!tests/config/${file}`),
    'src/prettier-comments/**/*.js'
  ]),
  {
    rules: {
      'no-console': ['warn', { allow: ['warn'] }]
    }
  },
  {
    files: ['**/*.ts'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      tseslint.configs.recommendedTypeChecked,
      eslintConfigPrettier
    ],

    plugins: {
      'import-x': eslintImportX
    },

    languageOptions: {
      parserOptions: {
        project: ['tsconfig.test.json']
      }
    },

    rules: {
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true }
      ],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          sortTypesGroup: true
        }
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error'
    }
  },
  {
    files: ['**/*.*js'],

    extends: [js.configs.recommended, eslintConfigPrettier],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        runFormatTest: 'readonly'
      }
    },

    rules: {
      // allow destructuring a property purely to exclude it from a rest
      // sibling, e.g. `({ plugins, ...options }) => ...`
      'no-unused-vars': ['error', { ignoreRestSiblings: true }]
    }
  }
]);
