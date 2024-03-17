import type { SupportOptions } from 'prettier';

const CATEGORY_GLOBAL = 'Global';
const CATEGORY_COMMON = 'Common';
const CATEGORY_JAVASCRIPT = 'JavaScript';
const CATEGORY_SOLIDITY = 'Solidity';

const options: SupportOptions = {
  printWidth: {
    category: CATEGORY_GLOBAL,
    type: 'int',
    default: 80,
    description: 'The line length where Prettier will try wrap.',
    range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 }
  },
  tabWidth: {
    type: 'int',
    category: CATEGORY_GLOBAL,
    default: 2,
    description: 'Number of spaces per indentation level.',
    range: { start: 0, end: Number.POSITIVE_INFINITY, step: 1 }
  },
  useTabs: {
    category: CATEGORY_GLOBAL,
    type: 'boolean',
    default: false,
    description: 'Indent with tabs instead of spaces.'
  },
  bracketSpacing: {
    category: CATEGORY_COMMON,
    type: 'boolean',
    default: true,
    description: 'Print spaces between brackets.',
    oppositeDescription: 'Do not print spaces between brackets.'
  },
  singleQuote: {
    category: CATEGORY_COMMON,
    type: 'boolean',
    default: false,
    description: 'Use single quotes instead of double quotes.'
  },
  experimentalTernaries: {
    category: CATEGORY_JAVASCRIPT,
    type: 'boolean',
    default: false,
    description:
      'Use curious ternaries, with the question mark after the condition.',
    oppositeDescription:
      'Default behavior of ternaries; keep question marks on the same line as the consequent.'
  },
  compiler: {
    category: CATEGORY_SOLIDITY,
    type: 'string',
    description:
      'The Solidity compiler version to help us avoid critical errors in format for the wrong version.'
  }
};

export default options;
