import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class UncheckedBlock implements SlangNode {
  readonly kind = NonterminalKind.UncheckedBlock;

  comments;

  loc;

  block: Block;

  constructor(
    ast: ast.UncheckedBlock,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.block = new Block(ast.block, offsets[0], options);

    metadata = updateMetadata(metadata, [this.block]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<UncheckedBlock>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return ['unchecked ', path.call(print, 'block')];
  }
}
