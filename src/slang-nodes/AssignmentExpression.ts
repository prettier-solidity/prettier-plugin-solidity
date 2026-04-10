import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printAssignmentRightSide } from '../slang-printers/print-assignment-right-side.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class AssignmentExpression extends SlangNode {
  readonly kind = NonterminalKind.AssignmentExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(
    ast: ast.AssignmentExpression,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.leftOperand = extractVariant(
      new Expression(ast.leftOperand, collected, options)
    );
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, collected, options)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);
  }

  print(path: AstPath<AssignmentExpression>, print: PrintFunction): Doc {
    return [
      path.call(print, 'leftOperand'),
      ` ${this.operator}`,
      printAssignmentRightSide(
        path.call(print, 'rightOperand'),
        this.rightOperand
      )
    ];
  }
}
