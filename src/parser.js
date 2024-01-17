// https://prettier.io/docs/en/plugins.html#parsers
import parser from '@solidity-parser/parser';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';

const tryHug = (node, operators) => {
  if (node.type === 'BinaryOperation' && operators.includes(node.operator))
    return {
      type: 'TupleExpression',
      components: [node],
      isArray: false
    };
  return node;
};

function parse(text, _parsers, options = _parsers) {
  const compiler = coerce(options.compiler);
  const parsed = parser.parse(text, { loc: true, range: true, comments: true });

  parser.visit(parsed, {
    PragmaDirective(ctx) {
      // if the pragma is not for solidity we leave.
      if (ctx.name !== 'solidity') return;
      // if the compiler option has not been provided we leave.
      if (!compiler) return;
      // we make a check against each pragma directive in the document.
      if (!satisfies(compiler, ctx.value)) {
        // @TODO: investigate the best way to warn that would apply to
        // different editors.
        // eslint-disable-next-line no-console
        console.warn(
          `[prettier-solidity] The compiler option is set to '${options.compiler}', which does not satisfy 'pragma solidity ${ctx.value}'.`
        );
      }
    },
    ModifierDefinition(ctx) {
      if (!ctx.parameters) {
        ctx.parameters = [];
      }
    },
    FunctionDefinition(ctx) {
      if (!ctx.isConstructor) {
        ctx.modifiers.forEach((modifier) => {
          if (modifier.arguments?.length === 0) {
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
      const value = ctx.value.slice(4, -1);
      ctx.value = options.singleQuote ? `hex'${value}'` : `hex"${value}"`;
    },
    Conditional(ctx) {
      // TODO: while the behaviour is not stable, it should be behind the
      // experimentalTernaries flag.
      if (options.experimentalTernaries) {
        // We can remove parentheses only because we are sure that the
        // `condition` must be a single `bool` value.
        while (
          ctx.condition.type === 'TupleExpression' &&
          !ctx.condition.isArray &&
          ctx.condition.components.length === 1 &&
          ctx.condition.components[0].type !== 'Conditional'
        ) {
          [ctx.condition] = ctx.condition.components;
        }
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
          // If the compiler has not been given as an option using we leave
          // a**b**c.
          if (!compiler) break;

          if (satisfies(compiler, '>=0.8.0')) {
            // If the compiler is greater than or equal to 0.8.0 then a**b**c
            // is formatted as a**(b**c).
            ctx.right = tryHug(ctx.right, ['**']);
            break;
          }
          if (
            ctx.right.type === 'BinaryOperation' &&
            ctx.right.operator === '**'
          ) {
            // the parser organizes the a**b**c as a**(b**c) so we need to
            // restructure it.
            const left = {
              type: 'BinaryOperation',
              operator: '**',
              left: ctx.left,
              right: ctx.right.left
            };
            ctx.left = {
              type: 'TupleExpression',
              components: [left],
              isArray: false
            };
            ctx.right = ctx.right.right;
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

export default parse;
