const extract = require('extract-comments');
// https://prettier.io/docs/en/plugins.html#parsers
const parser = require('solidity-parser-antlr');

const parse = text => {
  const parsed = parser.parse(text, { loc: true, range: true });
  parsed.comments = extract(text);

  // `code` and `codeStart` are different after prettifying, so the tests fail when they have AST_COMPARE enabled.
  // Since we don't use those properties, we just remove them.
  parsed.comments.forEach(comment => {
    delete comment.code;
    delete comment.codeStart;
    return comment;
  });

  return parsed;
};

module.exports = parse;
