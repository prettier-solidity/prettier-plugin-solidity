const extract = require('extract-comments');
// https://prettier.io/docs/en/plugins.html#parsers
const parser = require('solidity-parser-antlr');

const parse = text => {
  const parsed = parser.parse(text, { loc: true, range: true });
  parsed.comments = extract(text);
  parsed.comments.forEach(comment => {
    // info: remove unused properties
    delete comment.code; // eslint-disable-line no-param-reassign
    delete comment.codeStart; // eslint-disable-line no-param-reassign
  });

  return parsed;
};

module.exports = parse;
