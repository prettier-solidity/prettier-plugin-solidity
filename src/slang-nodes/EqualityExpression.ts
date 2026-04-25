import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const tryToHug = createHugFunction(['==', '!=']);

const printEqualityExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class EqualityExpression extends BinaryOperation {
  readonly kind = NonterminalKind.EqualityExpression;

  constructor(ast: ast.EqualityExpression, collected: CollectedMetadata) {
    super(ast, collected, printEqualityExpression);

    this.leftOperand = tryToHug(this.leftOperand);
  }
}
