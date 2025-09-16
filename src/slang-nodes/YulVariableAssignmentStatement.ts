import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { join } = doc.builders;

export class YulVariableAssignmentStatement extends SlangNode {
  readonly kind = NonterminalKind.YulVariableAssignmentStatement;

  variables: YulPaths;

  assignment: YulAssignmentOperator['variant'];

  expression: YulExpression['variant'];

  constructor(
    ast: ast.YulVariableAssignmentStatement,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.variables = new YulPaths(ast.variables);
    this.assignment = extractVariant(new YulAssignmentOperator(ast.assignment));
    this.expression = extractVariant(
      new YulExpression(ast.expression, options)
    );

    this.updateMetadata(this.variables, this.assignment, this.expression);
  }

  print(
    path: AstPath<YulVariableAssignmentStatement>,
    print: PrintFunction
  ): Doc {
    return join(' ', [
      path.call(print, 'variables'),
      path.call(print, 'assignment'),
      path.call(print, 'expression')
    ]);
  }
}
