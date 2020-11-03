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
  }
};

module.exports = options;
