// https://prettier.io/docs/en/plugins.html#parsers
const parse = text => ({
  ast_type: 'solidity-format',
  body: text,
  end: text.legth,
  source: text,
  start: 0
});

module.exports = parse;
