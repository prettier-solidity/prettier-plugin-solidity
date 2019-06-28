const extract = require('extract-comments');
// https://prettier.io/docs/en/plugins.html#parsers
const parser = require('solidity-parser-antlr');

function parse(text, parsers, options) {
  const parsed = parser.parse(text, { loc: true, range: true });
  parsed.comments = extract(text);

  parser.visit(parsed, {
    ForStatement(ctx) {
      if (ctx.initExpression) {
        ctx.initExpression.omitSemicolon = true;
      }
      if (ctx.loopExpression) {
        ctx.loopExpression.omitSemicolon = true;
      }
    },
    ElementaryTypeName(ctx) {
      if (options.explicitTypes === 'always') {
        if (ctx.name === 'uint') ctx.name = 'uint256';
        if (ctx.name === 'int') ctx.name = 'int256';
        if (ctx.name === 'byte') ctx.name = 'bytes1';
      } else if (options.explicitTypes === 'never') {
        if (ctx.name === 'uint256') ctx.name = 'uint';
        if (ctx.name === 'int256') ctx.name = 'int';
        if (ctx.name === 'bytes1') ctx.name = 'byte';
      }
    }
  });

  return parsed;
}

module.exports = parse;
