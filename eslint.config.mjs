import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      'coverage/**/*.js',
      'dist/**/*.cjs',
      'dist/**/*.js',
      'tests/**/*.snap',
      'tests/format/**/*.sol',
      'tests/format/Markdown/Markdown.md',
      'tests/format/RespectDefaultOptions/respect-default-options.js',
      'tests/config/**/*.*js',
      'src/prettier-comments/**/*.js'
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        runFormatTest: 'readonly'
      }
    },

    rules: {
      'no-console': [
        'warn',
        {
          allow: ['warn']
        }
      ]
    }
  },
  ...compat
    .extends(
      'prettier',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/stylistic',
      'plugin:@typescript-eslint/recommended-type-checked'
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts']
    })),
  {
    files: ['**/*.ts'],

    plugins: {
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json']
      }
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error'
    }
  },
  ...compat.extends('prettier').map((config) => ({
    ...config,
    files: ['**/*.*js']
  })),
  {
    files: ['**/*.*js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  }
];
