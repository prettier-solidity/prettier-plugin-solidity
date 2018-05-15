const parse = require('./parser');
const print = require('./printer');

// https://prettier.io/docs/en/plugins.html#languages
const languages = [
  {
    extensions: ['.sol'],
    name: 'Solidity',
    parsers: ['solidity-parse']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parsers = {
  'solidity-parse': {
    astFormat: 'solidity-ast',
    parse
  }
};

// https://prettier.io/docs/en/plugins.html#printers
const printers = {
  'solidity-ast': {
    print
  }
};

module.exports = {
  languages,
  parsers,
  printers
};
