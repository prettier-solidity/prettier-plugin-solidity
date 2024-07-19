import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { createBinaryOperationPrinter } from '../slang-printers/create-binary-operation-printer.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { TupleExpression } from './TupleExpression.js';
import { TupleValues } from './TupleValues.js';
import { TupleValue } from './TupleValue.js';

const { group, indent } = doc.builders;

const tryToHug = createHugFunction(['**']);

const printExponentiationExpression = createBinaryOperationPrinter(
  () => (document) => group(document), // always group
  () => (document) => indent(document) // always indent
);

export class ExponentiationExpression extends SlangNode {
  get kind() {
    return NonterminalKind.ExponentiationExpression;
  }

  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new Expression(
        ast.leftOperand,
        childrenOffsets.shift(),
        options
      ),
      operator: ast.operator.text,
      rightOperand: new Expression(
        ast.rightOperand,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);

    if (offset) {
      const compiler = coerce(options.compiler);
      if (compiler) {
        if (satisfies(compiler, '>=0.8.0')) {
          this.rightOperand = tryToHug(this.rightOperand);
        } else {
          // Currently the parser considers exponentiation as having left
          // association from 0.6.0.
          // in reality solidity fixed this from 0.8.0.
          // TODO: remove this once the parser has fixed this.
          // https://github.com/NomicFoundation/slang/issues/1031
          if (this.rightOperand.variant.kind === 'ExponentiationExpression') {
            const leftLoc = {
              startWithTrivia: this.leftOperand.loc.startWithTrivia,
              start: this.leftOperand.loc.start,
              endWithTrivia:
                this.rightOperand.variant.leftOperand.loc.endWithTrivia,
              end: this.rightOperand.variant.leftOperand.loc.end
            };
            this.leftOperand = Object.create(Expression.prototype, {
              loc: { value: { ...leftLoc } },
              variant: {
                value: Object.create(TupleExpression.prototype, {
                  loc: { value: { ...leftLoc } },
                  openParen: { value: '(' },
                  items: {
                    value: Object.create(TupleValues.prototype, {
                      loc: { value: { ...leftLoc } },
                      items: {
                        value: [
                          Object.create(TupleValue.prototype, {
                            loc: { value: { ...leftLoc } },
                            expression: {
                              value: Object.create(Expression.prototype, {
                                loc: { value: { ...leftLoc } },
                                variant: {
                                  value: Object.create(
                                    ExponentiationExpression.prototype,
                                    {
                                      loc: { value: { ...leftLoc } },
                                      leftOperand: { value: this.leftOperand },
                                      operator: { value: '**' },
                                      rightOperand: {
                                        value:
                                          this.rightOperand.variant.leftOperand
                                      }
                                    }
                                  )
                                }
                              })
                            }
                          })
                        ]
                      },
                      separators: { value: [] }
                    })
                  },
                  closeParen: { value: ')' }
                })
              }
            });
            this.rightOperand = this.rightOperand.variant.rightOperand;
          }
          this.leftOperand = tryToHug(this.leftOperand);
        }
      }
    }
  }

  print(path, print, options) {
    return printExponentiationExpression({ node: this, path, print, options });
  }
}
