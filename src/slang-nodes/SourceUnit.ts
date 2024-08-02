import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

const { line } = doc.builders;

export class SourceUnit implements SlangNode {
  readonly kind = NonterminalKind.SourceUnit;

  comments;

  loc;

  members: SourceUnitMembers;

  constructor(
    ast: ast.SourceUnit,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.members = new SourceUnitMembers(ast.members, offsets[0], options);

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<SourceUnit>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions<AstNode>
  ): Doc {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
