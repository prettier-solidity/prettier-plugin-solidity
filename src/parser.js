const parser = require('solidity-parser-antlr');

// https://prettier.io/docs/en/plugins.html#parsers
// eslint-disable-next-line arrow-body-style
const parse = text => {
  return parser.parse(text);
};

module.exports = parse;
