import type { SupportOptions } from 'prettier';

const CATEGORY_COMMON = 'Common';
const CATEGORY_JAVASCRIPT = 'JavaScript';
const CATEGORY_SOLIDITY = 'Solidity';

const options: SupportOptions = {
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
  experimentalOperatorPosition: {
    category: CATEGORY_JAVASCRIPT,
    type: 'choice',
    default: 'end',
    description: 'Where to print operators when binary expressions wrap lines.',
    choices: [
      {
        value: 'start',
        description: 'Print operators at the start of new lines.'
      },
      {
        value: 'end',
        description: 'Print operators at the end of previous lines.'
      }
    ]
  },
  compiler: {
    category: CATEGORY_SOLIDITY,
    type: 'string',
    description:
      'The Solidity compiler version to help us avoid critical errors in format for the wrong version.'
  }
};

export default options;
