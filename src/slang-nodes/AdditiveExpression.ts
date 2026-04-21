import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const tryToHug = createHugFunction(['%']);

const printAdditiveExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.ShiftExpression,
    NonterminalKind.BitwiseAndExpression,
    NonterminalKind.BitwiseOrExpression,
    NonterminalKind.BitwiseXorExpression,
    NonterminalKind.InequalityExpression,
    NonterminalKind.EqualityExpression,
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class AdditiveExpression extends BinaryOperation {
  readonly kind = NonterminalKind.AdditiveExpression;

  constructor(ast: ast.AdditiveExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(
    print: PrintFunction,
    path: AstPath<AdditiveExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printAdditiveExpression(this, path, print, options);
  }
}
