import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import {
  binaryOperationPrintBuilder,
  createHugFunction
} from '../common/slang-helpers.js';

const { group, indent } = doc.builders;

const tryToHug = createHugFunction(['**']);

export const ExponentiationExpression = {
  parse: ({ offsets, ast, options, parse }) => {
    const compiler = coerce(options.compiler);
    let leftOperand = parse(ast.leftOperand, options, parse, offsets);
    let rightOperand = parse(ast.rightOperand, options, parse, offsets);

    if (compiler) {
      if (satisfies(compiler, '>=0.8.0')) {
        rightOperand = tryToHug(rightOperand);
      } else {
        // Currently the parser considers exponentiation as having left
        // association from 0.6.0.
        // in reality solidity fixed this from 0.8.0.
        // TODO: remove this once the parser has fixed this.
        // https://github.com/NomicFoundation/slang/issues/1031
        if (rightOperand.variant.kind === 'ExponentiationExpression') {
          const leftLoc = {
            start: leftOperand.loc.start,
            end: rightOperand.variant.leftOperand.loc.end
          };
          leftOperand = {
            kind: 'Expression',
            loc: { ...leftLoc },
            variant: {
              kind: 'TupleExpression',
              loc: { ...leftLoc },
              openParen: '(',
              items: {
                kind: 'TupleValues',
                loc: { ...leftLoc },
                items: [
                  {
                    kind: 'TupleValue',
                    loc: { ...leftLoc },
                    expression: {
                      kind: 'Expression',
                      loc: { ...leftLoc },
                      variant: {
                        kind: 'ExponentiationExpression',
                        loc: { ...leftLoc },
                        leftOperand,
                        operator: '**',
                        rightOperand: rightOperand.variant.leftOperand
                      }
                    }
                  }
                ],
                separators: []
              },
              closeParen: ')'
            }
          };
          rightOperand = rightOperand.variant.rightOperand;
        }
        leftOperand = tryToHug(leftOperand);
      }
    }
    return {
      leftOperand,
      operator: ast.operator.text,
      rightOperand
    };
  },
  print: binaryOperationPrintBuilder(
    () => (document) => group(document), // always group
    () => (document) => indent(document) // always indent
  )
};
