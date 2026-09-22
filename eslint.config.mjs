import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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
      import: eslintImport
    },

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.test.json']
      }
    },

    rules: {
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true }
      ],
      'import/order': [
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
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  }
]);
