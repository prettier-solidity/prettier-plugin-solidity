import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printAssignmentRightSide } from '../slang-printers/print-assignment-right-side.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class VariableDeclarationValue extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  expression: Expression['variant'];

  constructor(ast: ast.VariableDeclarationValue, collected: CollectedMetadata) {
    super(ast, collected);

    this.expression = extractVariant(new Expression(ast.expression, collected));

    this.updateMetadata(this.expression);
  }

  print(print: PrintFunction): Doc {
    return [
      ' =',
      printAssignmentRightSide(print('expression'), this.expression)
    ];
  }
}
