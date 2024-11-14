import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join } = doc.builders;

export class YulVariableAssignmentStatement implements SlangNode {
  readonly kind = NonterminalKind.YulVariableAssignmentStatement;

  comments;

  loc;

  variables: YulPaths;

  assignment: YulAssignmentOperator;

  expression: YulExpression;

  constructor(
    ast: ast.YulVariableAssignmentStatement,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.variables = new YulPaths(ast.variables);
    this.assignment = new YulAssignmentOperator(ast.assignment);
    this.expression = new YulExpression(ast.expression, options);

    metadata = updateMetadata(metadata, [
      this.variables,
      this.assignment,
      this.expression
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
