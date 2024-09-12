import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

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
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return [
      path.call(print, 'members'),
      // Prettier's Markdown formatter already appends a new line on code
      // blocks, therefore we avoid trailing with a new line at the end of
      // a file in this case.
      // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/764
      options.parentParser ? '' : line
    ];
  }
}
