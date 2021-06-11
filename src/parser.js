const extractComments = require('solidity-comments-extractor');
// https://prettier.io/docs/en/plugins.html#parsers
const parser = require('@solidity-parser/parser');
const semver = require('semver');
const solc = require('./solc.json');

const tryHug = (node, operators) => {
  if (node.type === 'BinaryOperation' && operators.includes(node.operator))
    return {
      type: 'TupleExpression',
      components: [node],
      isArray: false
    };
  return node;
};

function parse(text, _parsers, options) {
  let { compiler } = options;
  let compilers = [...solc];
  const parsed = parser.parse(text, { loc: true, range: true });
  parsed.comments = extractComments(text);

  parser.visit(parsed, {
    PragmaDirective(ctx) {
      // @TODO: remove hack once the retrieval of @solidity-parser/parser is fixed
      ctx.value = ctx.value
        .replace(/([<>=])/g, ' $1')
        .replace(/< =/g, '<=')
        .replace(/> =/g, '>=')
        .trim();
      if (ctx.value.split(' ').length > 1) {
        ctx.value = semver.validRange(ctx.value);
      }
      if (ctx.name !== 'solidity') return;
      if (!['latest', 'earliest'].includes(compiler)) return;
      compilers = compilers.filter((version) =>
        semver.satisfies(version.value, ctx.value)
      );
    }
  });

  if (compilers.length === 0) compilers = [...solc];
  if (compiler === 'latest') compiler = compilers[0].value;
  if (compiler === 'earliest') compiler = compilers.slice(-1)[0].value;

  parser.visit(parsed, {
    SourceUnit(ctx) {
      ctx.compiler = compiler;
    }
  });

  parser.visit(parsed, {
    ForStatement(ctx) {
      if (ctx.initExpression) {
        ctx.initExpression.omitSemicolon = true;
      }
      ctx.loopExpression.omitSemicolon = true;
    }
  });

  parser.visit(parsed, {
    HexLiteral(ctx) {
      ctx.value = options.singleQuote
        ? `hex'${ctx.value.slice(4, -1)}'`
        : `hex"${ctx.value.slice(4, -1)}"`;
    }
  });

  parser.visit(parsed, {
    ElementaryTypeName(ctx) {
      // We avoid making changes for bytes1 since the type 'byte' was removed
      // in v0.8.0
      // See the breaking changes in https://docs.soliditylang.org/en/v0.8.0/080-breaking-changes.html#silent-changes-of-the-semantics
      // The type byte has been removed. It was an alias of bytes1.
      // TODO once we decide to keep track of the pragma, we can implement this again.

      if (options.explicitTypes === 'always') {
        if (ctx.name === 'uint') ctx.name = 'uint256';
        if (ctx.name === 'int') ctx.name = 'int256';
      } else if (options.explicitTypes === 'never') {
        if (ctx.name === 'uint256') ctx.name = 'uint';
        if (ctx.name === 'int256') ctx.name = 'int';
      }
    }
  });

  parser.visit(parsed, {
    BinaryOperation(ctx) {
      switch (ctx.operator) {
        case '+':
        case '-':
          ctx.left = tryHug(ctx.left, ['%']);
          ctx.right = tryHug(ctx.right, ['%']);
          break;
        case '*':
          ctx.left = tryHug(ctx.left, ['/', '%']);
          break;
        case '/':
          ctx.left = tryHug(ctx.left, ['*', '%']);
          break;
        case '%':
          ctx.left = tryHug(ctx.left, ['*', '/', '%']);
          break;
        case '**':
          // We avoid making changes here since the order of precedence of the
          // operators for ** changed in v0.8.0
          // See the breaking changes in https://docs.soliditylang.org/en/v0.8.0/080-breaking-changes.html#silent-changes-of-the-semantics
          // Exponentiation is right associative, i.e., the expression a**b**c
          // is parsed as a**(b**c). Before 0.8.0, it was parsed as (a**b)**c.
          // TODO once we decide to keep track of the pragma, we can implement this again.
          break;
        case '<<':
        case '>>':
          ctx.left = tryHug(ctx.left, ['+', '-', '*', '/', '**', '<<', '>>']);
          ctx.right = tryHug(ctx.right, ['+', '-', '*', '/', '**']);
          break;
        case '&':
          ctx.left = tryHug(ctx.left, ['+', '-', '*', '/', '**', '<<', '>>']);
          ctx.right = tryHug(ctx.right, ['+', '-', '*', '/', '**', '<<', '>>']);
          break;
        case '|':
          ctx.left = tryHug(ctx.left, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&',
            '^'
          ]);
          ctx.right = tryHug(ctx.right, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&',
            '^'
          ]);
          break;
        case '^':
          ctx.left = tryHug(ctx.left, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&'
          ]);
          ctx.right = tryHug(ctx.right, [
            '+',
            '-',
            '*',
            '/',
            '**',
            '<<',
            '>>',
            '&'
          ]);
          break;
        case '||':
          ctx.left = tryHug(ctx.left, ['&&']);
          ctx.right = tryHug(ctx.right, ['&&']);
          break;
        case '&&':
        default:
          break;
      }
    }
  });

  return parsed;
}

module.exports = parse;
