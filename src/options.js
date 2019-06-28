const CATEGORY_GLOBAL = 'Global';
const CATEGORY_COMMON = 'Common';

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
  // TODO: uncomment when https://github.com/prettier-solidity/prettier-plugin-solidity/pull/144
  //       is merged.
  // singleQuote: {
  //   since: '0.0.0',
  //   category: CATEGORY_COMMON,
  //   type: 'boolean',
  //   default: false,
  //   description: 'Use single quotes instead of double quotes.'
  // },
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
  }
};

module.exports = options;
