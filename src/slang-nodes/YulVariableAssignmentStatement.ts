import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { join } = doc.builders;

export class YulVariableAssignmentStatement extends SlangNode {
  readonly kind = NonterminalKind.YulVariableAssignmentStatement;

  variables: YulPaths;

  assignment: YulAssignmentOperator['variant'];

  expression: YulExpression['variant'];

  constructor(
    ast: ast.YulVariableAssignmentStatement,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.variables = new YulPaths(ast.variables, collected);
    this.assignment = extractVariant(
      new YulAssignmentOperator(ast.assignment, collected)
    );
    this.expression = extractVariant(
      new YulExpression(ast.expression, collected, options)
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
