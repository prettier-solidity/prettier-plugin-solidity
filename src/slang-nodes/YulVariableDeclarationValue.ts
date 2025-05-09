import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulVariableDeclarationValue implements SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationValue;

  comments;

  loc;

  assignment: YulAssignmentOperator;

  expression: YulExpression;

  constructor(ast: ast.YulVariableDeclarationValue) {
    let metadata = getNodeMetadata(ast);

    this.assignment = new YulAssignmentOperator(ast.assignment);
    this.expression = new YulExpression(ast.expression);

    metadata = updateMetadata(metadata, [this.assignment, this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulVariableDeclarationValue>, print: PrintFunction): Doc {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
