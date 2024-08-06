import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { createBinaryOperationPrinter } from '../slang-printers/create-binary-operation-printer.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { TupleExpression } from './TupleExpression.js';
import { TupleValues } from './TupleValues.js';
import { TupleValue } from './TupleValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

const { group, indent } = doc.builders;

const tryToHug = createHugFunction(['**']);

const printExponentiationExpression = createBinaryOperationPrinter(
  () =>
    (document: Doc): Doc =>
      group(document), // always group
  () =>
    (document: Doc): Doc =>
      indent(document) // always indent
);

const objectConfig = {
  writable: true,
  enumerable: true,
  configurable: true
};

export class ExponentiationExpression implements SlangNode {
  readonly kind = NonterminalKind.ExponentiationExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.ExponentiationExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.leftOperand = new Expression(ast.leftOperand, offsets[0], options);
    this.operator = ast.operator.text;
    this.rightOperand = new Expression(ast.rightOperand, offsets[1], options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

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
        if (
          typeof this.rightOperand.variant !== 'string' &&
          this.rightOperand.variant.kind ===
            NonterminalKind.ExponentiationExpression
        ) {
          const leftLoc = {
            leadingOffset: this.leftOperand.loc.leadingOffset,
            start: this.leftOperand.loc.start,
            trailingOffset:
              this.rightOperand.variant.leftOperand.loc.trailingOffset,
            end: this.rightOperand.variant.leftOperand.loc.end
          };
          this.leftOperand = Object.create(Expression.prototype, {
            kind: { value: NonterminalKind.Expression, ...objectConfig },
            loc: { value: { ...leftLoc }, ...objectConfig },
            comments: { value: [], ...objectConfig },
            variant: {
              value: Object.create(TupleExpression.prototype, {
                kind: {
                  value: NonterminalKind.TupleExpression,
                  ...objectConfig
                },
                loc: { value: { ...leftLoc }, ...objectConfig },
                comments: { value: [], ...objectConfig },
                items: {
                  value: Object.create(TupleValues.prototype, {
                    kind: {
                      value: NonterminalKind.TupleValues,
                      ...objectConfig
                    },
                    loc: { value: { ...leftLoc }, ...objectConfig },
                    comments: { value: [], ...objectConfig },
                    items: {
                      value: [
                        Object.create(TupleValue.prototype, {
                          kind: {
                            value: NonterminalKind.TupleValue,
                            ...objectConfig
                          },
                          loc: { value: { ...leftLoc }, ...objectConfig },
                          comments: { value: [], ...objectConfig },
                          expression: {
                            value: Object.create(Expression.prototype, {
                              kind: {
                                value: NonterminalKind.Expression,
                                ...objectConfig
                              },
                              loc: { value: { ...leftLoc }, ...objectConfig },
                              comments: { value: [], ...objectConfig },
                              variant: {
                                value: Object.create(
                                  ExponentiationExpression.prototype,
                                  {
                                    kind: {
                                      value:
                                        NonterminalKind.ExponentiationExpression,
                                      ...objectConfig
                                    },
                                    loc: {
                                      value: { ...leftLoc },
                                      ...objectConfig
                                    },
                                    comments: { value: [], ...objectConfig },
                                    leftOperand: {
                                      value: this.leftOperand,
                                      ...objectConfig
                                    },
                                    operator: { value: '**', ...objectConfig },
                                    rightOperand: {
                                      value:
                                        this.rightOperand.variant.leftOperand,
                                      ...objectConfig
                                    }
                                  }
                                ) as ExponentiationExpression,
                                ...objectConfig
                              }
                            }) as Expression,
                            ...objectConfig
                          }
                        }) as TupleValue
                      ],
                      ...objectConfig
                    },
                    separators: { value: [], ...objectConfig }
                  }) as TupleValues,
                  ...objectConfig
                }
              }) as TupleExpression,
              ...objectConfig
            }
          }) as Expression;
          this.rightOperand = this.rightOperand.variant.rightOperand;
        }
        this.leftOperand = tryToHug(this.leftOperand);
      }
    }
  }

  print(
    path: AstPath<ExponentiationExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printExponentiationExpression(this, path, print, options);
  }
}
