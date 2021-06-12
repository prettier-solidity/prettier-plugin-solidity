const solc = require('./solc.json');

const CATEGORY_SOLIDITY = 'Solidity';

const options = {
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
  },
  compiler: {
    category: CATEGORY_SOLIDITY,
    type: 'choice',
    default: 'latest',
    description:
      'The Solidity compiler version to help us avoid critical errors in format for the wrong version.',
    choices: [
      {
        value: 'latest',
        description:
          'Will attempt to infer the latest possible compiler according to the pragma statements.'
      },
      {
        value: 'earliest',
        description:
          'Will attempt to infer the earliest possible compiler according to the pragma statements.'
      },
      ...solc.map((version) => ({
        value: version,
        description: `Solidity ${version}`
      }))
    ]
  }
};

module.exports = options;
