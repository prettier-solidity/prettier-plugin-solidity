import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class AndExpression extends BinaryOperation {
  readonly kind = NonterminalKind.AndExpression;

  constructor(ast: ast.AndExpression, collected: CollectedMetadata) {
    super(ast, collected, printLogicalOperation);
  }
}
