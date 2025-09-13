import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulVariableDeclarationValue extends SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationValue;

  assignment: YulAssignmentOperator;

  expression: YulExpression;

  constructor(
    ast: ast.YulVariableDeclarationValue,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.assignment = new YulAssignmentOperator(ast.assignment);
    this.expression = new YulExpression(ast.expression, options);

    this.updateMetadata(this.assignment, this.expression);
  }

  print(path: AstPath<YulVariableDeclarationValue>, print: PrintFunction): Doc {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
