const extractComments = require('solidity-comments-extractor');
// https://prettier.io/docs/en/plugins.html#parsers
const parser = require('@solidity-parser/parser');

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
  const parsed = parser.parse(text, { loc: true, range: true });
  parsed.comments = extractComments(text);

  parser.visit(parsed, {
    ModifierDefinition(ctx) {
      if (!ctx.parameters) {
        ctx.parameters = [];
      }
    },
    FunctionDefinition(ctx) {
      if (!ctx.isConstructor) {
        ctx.modifiers.forEach((modifier) => {
          if (modifier.arguments && modifier.arguments.length === 0) {
            // eslint-disable-next-line no-param-reassign
            modifier.arguments = null;
          }
        });
      }
    },
    ForStatement(ctx) {
      if (ctx.initExpression) {
        ctx.initExpression.omitSemicolon = true;
      }
      ctx.loopExpression.omitSemicolon = true;
    },
    HexLiteral(ctx) {
      ctx.value = options.singleQuote
        ? `hex'${ctx.value.slice(4, -1)}'`
        : `hex"${ctx.value.slice(4, -1)}"`;
    },
    ElementaryTypeName(ctx) {
      if (options.explicitTypes === 'always') {
        if (ctx.name === 'uint') ctx.name = 'uint256';
        if (ctx.name === 'int') ctx.name = 'int256';
      } else if (options.explicitTypes === 'never') {
        if (ctx.name === 'uint256') ctx.name = 'uint';
        if (ctx.name === 'int256') ctx.name = 'int';
      }
    },
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
          if (
            ctx.left.type === 'BinaryOperation' &&
            ctx.left.operator === '**'
          ) {
            // the parser still organizes the a**b**c as (a**b)**c so we need
            // to restructure it.
            ctx.right = {
              type: 'TupleExpression',
              components: [
                {
                  type: 'BinaryOperation',
                  operator: '**',
                  left: ctx.left.right,
                  right: ctx.right
                }
              ],
              isArray: false
            };
            ctx.left = ctx.left.left;
          }
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
