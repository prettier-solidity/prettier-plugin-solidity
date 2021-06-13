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
      // if the pragma is for solidity we proceed.
      if (ctx.name !== 'solidity') return;
      // if the compiler option is 'latest' or 'earliest' we proceed.
      if (!['latest', 'earliest'].includes(compiler)) return;
      // the list of valid compilers will shrink for each pragma directive in
      // the document.
      compilers = compilers.filter((version) =>
        semver.satisfies(version, ctx.value)
      );
    }
  });

  if (compilers.length === 0) {
    // if the list of valid compilers shrank to 0, we could not infer the
    // compiler version from the document and we will use the full list.
    compilers = [...solc];
  }
  if (compiler === 'latest') [compiler] = compilers;
  if (compiler === 'earliest') [compiler] = compilers.slice(-1);

  // Since we should not modify options, we assign the chosen compiler at the
  // SourceUnit level.
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
      // if the compiler is below 0.8.0 we will recognize the type 'byte' as an
      // alias of 'bytes1'. Otherwise we will ignore this and enforce always
      // 'bytes1'.
      const pre080 = semver.satisfies(compiler, '<0.8.0');
      if (!pre080 && ctx.name === 'byte') ctx.name = 'bytes1';

      if (options.explicitTypes === 'always') {
        if (ctx.name === 'uint') ctx.name = 'uint256';
        if (ctx.name === 'int') ctx.name = 'int256';
        if (pre080 && ctx.name === 'byte') ctx.name = 'bytes1';
      } else if (options.explicitTypes === 'never') {
        if (ctx.name === 'uint256') ctx.name = 'uint';
        if (ctx.name === 'int256') ctx.name = 'int';
        if (pre080 && ctx.name === 'bytes1') ctx.name = 'byte';
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
