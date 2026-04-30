import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulVariableDeclarationValue extends SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationValue;

  assignment: YulAssignmentOperator['variant'];

  expression: YulExpression['variant'];

  constructor(
    ast: ast.YulVariableDeclarationValue,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.assignment = extractVariant(
      new YulAssignmentOperator(ast.assignment, collected)
    );
    this.expression = extractVariant(
      new YulExpression(ast.expression, collected)
    );

    this.updateMetadata(this.assignment, this.expression);
  }

  print(print: PrintFunction): Doc {
    return [print('assignment'), ' ', print('expression')];
  }
}
