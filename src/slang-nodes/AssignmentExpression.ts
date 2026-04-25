import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printAssignmentRightSide } from '../slang-printers/print-assignment-right-side.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { BinaryOperation as BinaryOperationType } from './types.d.ts';

function printAssignmentExpression(
  node: BinaryOperationType,
  print: PrintFunction
): Doc {
  return [
    print('leftOperand'),
    ` ${node.operator}`,
    printAssignmentRightSide(print('rightOperand'), node.rightOperand)
  ];
}

export class AssignmentExpression extends BinaryOperation {
  readonly kind = NonterminalKind.AssignmentExpression;

  constructor(ast: ast.AssignmentExpression, collected: CollectedMetadata) {
    super(ast, collected, printAssignmentExpression);
  }
}
