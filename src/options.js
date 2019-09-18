const CATEGORY_GLOBAL = 'Global';
const CATEGORY_COMMON = 'Common';
const CATEGORY_SOLIDITY = 'Solidity';

const options = {
  bracketSpacing: {
    since: '0.0.0',
    category: CATEGORY_COMMON,
    type: 'boolean',
    default: false,
    description: 'Print spaces between brackets.',
    oppositeDescription: 'Do not print spaces between brackets.'
  },
  printWidth: {
    since: '0.0.0',
    category: CATEGORY_GLOBAL,
    type: 'int',
    default: 80,
    description: 'The line length where Prettier will try wrap.',
    range: {
      start: 0,
      end: Infinity,
      step: 1
    }
  },
  singleQuote: {
    since: '0.0.0',
    category: CATEGORY_COMMON,
    type: 'boolean',
    default: false,
    description: 'Use single quotes instead of double quotes.'
  },
  tabWidth: {
    type: 'int',
    category: CATEGORY_GLOBAL,
    default: 4,
    description: 'Number of spaces per indentation level.',
    range: {
      start: 0,
      end: Infinity,
      step: 1
    }
  },
  useTabs: {
    since: '1.0.0',
    category: CATEGORY_GLOBAL,
    type: 'boolean',
    default: false,
    description: 'Indent with tabs instead of spaces.'
  },
  explicitTypes: {
    category: CATEGORY_SOLIDITY,
    type: 'choice',
    default: 'always',
    description: 'Change when type aliases are used.',
    choices: [
      {
        value: 'always',
        description:
          'Prefer the explicit types `uint256`, `int256`, and `bytes1`.'
      },
      {
        value: 'never',
        description: 'Prefer the type aliases `uint`, `int`, and `byte`.'
      },
      {
        value: 'preserve',
        description: 'Respect the type used by the developer.'
      }
    ]
  }
};

module.exports = options;
