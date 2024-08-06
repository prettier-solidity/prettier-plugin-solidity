import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class AndExpression implements SlangNode {
  readonly kind = NonterminalKind.AndExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.AndExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.leftOperand = new Expression(ast.leftOperand, offsets[0], options);
    this.operator = ast.operator.text;
    this.rightOperand = new Expression(ast.rightOperand, offsets[1], options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<AndExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printLogicalOperation(this, path, print, options);
  }
}
