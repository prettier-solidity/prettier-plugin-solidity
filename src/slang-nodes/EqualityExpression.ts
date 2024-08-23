import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printComparisonOperation } from '../slang-printers/print-comparison-operation.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class EqualityExpression implements SlangNode {
  readonly kind = NonterminalKind.EqualityExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(ast: ast.EqualityExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.leftOperand = new Expression(ast.leftOperand, options);
    this.operator = ast.operator.text;
    this.rightOperand = new Expression(ast.rightOperand, options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<EqualityExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printComparisonOperation(this, path, print, options);
  }
}
