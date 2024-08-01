import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class PostfixExpression implements SlangNode {
  readonly kind = NonterminalKind.PostfixExpression;

  comments;

  loc;

  operand: Expression;

  operator: string;

  constructor(
    ast: ast.PostfixExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operand = new Expression(ast.operand, offsets[0], options);
    this.operator = ast.operator.text;

    metadata = updateMetadata(metadata, [this.operand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<PostfixExpression>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [path.call(print, 'operand'), this.operator];
  }
}
