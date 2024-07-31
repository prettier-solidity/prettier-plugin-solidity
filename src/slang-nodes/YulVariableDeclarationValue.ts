import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulVariableDeclarationValue implements SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationValue;

  comments;

  loc;

  assignment: YulAssignmentOperator;

  expression: YulExpression;

  constructor(
    ast: ast.YulVariableDeclarationValue,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.assignment = new YulAssignmentOperator(ast.assignment, offsets[0]);
    this.expression = new YulExpression(ast.expression, offsets[1], options);

    metadata = updateMetadata(metadata, [this.assignment, this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
