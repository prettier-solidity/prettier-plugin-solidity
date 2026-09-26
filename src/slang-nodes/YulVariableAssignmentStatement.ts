import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { join } from '../slang-printers/prettier-builders.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { YulPaths } from './YulPaths.ts';
import { YulAssignmentOperator } from './YulAssignmentOperator.ts';
import { YulExpression } from './YulExpression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulVariableAssignmentStatement extends SlangNode {
  readonly kind = NonterminalKind.YulVariableAssignmentStatement;

  variables: YulPaths;

  assignment: YulAssignmentOperator['variant'];

  expression: YulExpression['variant'];

  constructor(
    ast: ast.YulVariableAssignmentStatement,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.variables = new YulPaths(ast.variables, collected);
    this.assignment = extractVariant(
      new YulAssignmentOperator(ast.assignment, collected)
    );
    this.expression = extractVariant(
      new YulExpression(ast.expression, collected)
    );

    this.updateMetadata(this.variables, this.assignment, this.expression);
  }

  print(print: PrintFunction): Doc {
    return join(' ', [
      print('variables'),
      print('assignment'),
      print('expression')
    ]);
  }
}
