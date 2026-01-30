import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulVariableDeclarationValue extends SlangNode {
  readonly kind = NonterminalKind.YulVariableDeclarationValue;

  assignment: YulAssignmentOperator['variant'];

  expression: YulExpression['variant'];

  constructor(
    ast: ast.YulVariableDeclarationValue,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.assignment = extractVariant(
      new YulAssignmentOperator(ast.assignment, collected)
    );
    this.expression = extractVariant(
      new YulExpression(ast.expression, collected, options)
    );

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
