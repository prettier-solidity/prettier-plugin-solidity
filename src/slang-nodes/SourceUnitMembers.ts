import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { SourceUnitMember } from './SourceUnitMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class SourceUnitMembers implements SlangNode {
  readonly kind = NonterminalKind.SourceUnitMembers;

  comments;

  loc;

  items: SourceUnitMember[];

  constructor(
    ast: ast.SourceUnitMembers,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new SourceUnitMember(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<SourceUnitMembers>,
    print: (path: AstPath<AstNode | string>) => Doc,
    options: ParserOptions<AstNode>
  ): Doc {
    return printPreservingEmptyLines(path, print, options);
  }
}
