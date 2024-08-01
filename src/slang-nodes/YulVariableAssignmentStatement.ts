import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class YulVariableAssignmentStatement implements SlangNode {
  readonly kind = NonterminalKind.YulVariableAssignmentStatement;

  comments;

  loc;

  names: YulPaths;

  assignment: YulAssignmentOperator;

  expression: YulExpression;

  constructor(
    ast: ast.YulVariableAssignmentStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.names = new YulPaths(ast.names, offsets[0]);
    this.assignment = new YulAssignmentOperator(ast.assignment, offsets[1]);
    this.expression = new YulExpression(ast.expression, offsets[2], options);

    metadata = updateMetadata(metadata, [
      this.names,
      this.assignment,
      this.expression
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<YulVariableAssignmentStatement>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      path.call(print, 'names'),
      ' ',
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
