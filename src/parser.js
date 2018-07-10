// https://prettier.io/docs/en/plugins.html#parsers
const parser = require('solidity-parser-antlr');

const parse = text => parser.parse(text, { loc: true, range: true });

module.exports = parse;
