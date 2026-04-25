import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const tryToHug = createHugFunction(['+', '-', '*', '/', '**', '<<', '>>']);

const printBitwiseAndExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.InequalityExpression,
    NonterminalKind.EqualityExpression,
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class BitwiseAndExpression extends BinaryOperation {
  readonly kind = NonterminalKind.BitwiseAndExpression;

  constructor(ast: ast.BitwiseAndExpression, collected: CollectedMetadata) {
    super(ast, collected, printBitwiseAndExpression);

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }
}
