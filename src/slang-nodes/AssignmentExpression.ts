import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printAssignmentRightSide } from '../slang-printers/print-assignment-right-side.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class AssignmentExpression extends SlangNode {
  readonly kind = NonterminalKind.AssignmentExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(ast: ast.AssignmentExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.leftOperand = extractVariant(
      new Expression(ast.leftOperand, collected)
    );
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, collected)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);
  }

  print(print: PrintFunction): Doc {
    return [
      print('leftOperand'),
      ` ${this.operator}`,
      printAssignmentRightSide(print('rightOperand'), this.rightOperand)
    ];
  }
}
