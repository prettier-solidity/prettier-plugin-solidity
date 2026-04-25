import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const tryToHug = createHugFunction(['&&']);

export class OrExpression extends BinaryOperation {
  readonly kind = NonterminalKind.OrExpression;

  constructor(ast: ast.OrExpression, collected: CollectedMetadata) {
    super(ast, collected, printLogicalOperation);

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }
}
