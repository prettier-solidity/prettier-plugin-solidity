import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleValues } from './TupleValues.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class TupleExpression implements SlangNode {
  readonly kind = NonterminalKind.TupleExpression;

  comments;

  loc;

  openParen: string;

  items: TupleValues;

  closeParen: string;

  constructor(
    ast: ast.TupleExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openParen = ast.openParen.text;
    this.items = new TupleValues(ast.items, offsets[0], options);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<TupleExpression>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [this.openParen, path.call(print, 'items'), this.closeParen];
  }
}
