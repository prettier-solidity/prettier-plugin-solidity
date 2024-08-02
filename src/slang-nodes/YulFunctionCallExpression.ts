import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class YulFunctionCallExpression implements SlangNode {
  readonly kind = NonterminalKind.YulFunctionCallExpression;

  comments;

  loc;

  operand: YulExpression;

  openParen: string;

  arguments: YulArguments;

  closeParen: string;

  constructor(
    ast: ast.YulFunctionCallExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operand = new YulExpression(ast.operand, offsets[0], options);
    this.openParen = ast.openParen.text;
    this.arguments = new YulArguments(ast.arguments, offsets[1], options);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.operand, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<YulFunctionCallExpression>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      path.call(print, 'operand'),
      this.openParen,
      path.call(print, 'arguments'),
      this.closeParen
    ];
  }
}
