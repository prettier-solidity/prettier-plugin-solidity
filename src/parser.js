const extract = require('extract-comments');
// https://prettier.io/docs/en/plugins.html#parsers
const parser = require('solidity-parser-antlr');

const parse = text => {
  const parsed = parser.parse(text, { loc: true, range: true });
  parsed.comments = extract(text);
  return parsed;
};

module.exports = parse;
