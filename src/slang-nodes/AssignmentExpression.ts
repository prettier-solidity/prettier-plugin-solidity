import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printAssignmentRightSide } from '../slang-printers/print-assignment-right-side.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class AssignmentExpression extends BinaryOperation {
  readonly kind = NonterminalKind.AssignmentExpression;

  constructor(ast: ast.AssignmentExpression, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(print: PrintFunction): Doc {
    return [
      print('leftOperand'),
      ` ${this.operator}`,
      printAssignmentRightSide(print('rightOperand'), this.rightOperand)
    ];
  }
}
