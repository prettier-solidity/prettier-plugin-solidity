import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { PositionalArguments } from './PositionalArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class PositionalArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.PositionalArgumentsDeclaration;

  comments;

  loc;

  openParen: string;

  arguments: PositionalArguments;

  closeParen: string;

  constructor(
    ast: ast.PositionalArgumentsDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openParen = ast.openParen.text;
    this.arguments = new PositionalArguments(
      ast.arguments,
      offsets[0],
      options
    );
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<PositionalArgumentsDeclaration>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [this.openParen, path.call(print, 'arguments'), this.closeParen];
  }
}
