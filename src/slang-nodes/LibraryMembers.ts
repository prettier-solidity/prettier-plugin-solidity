import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { hardline } = doc.builders;

export class LibraryMembers implements SlangNode {
  readonly kind = NonterminalKind.LibraryMembers;

  comments;

  loc;

  items: ContractMember[];

  constructor(
    ast: ast.LibraryMembers,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new ContractMember(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<LibraryMembers>,
    print: (path: AstPath<AstNode | string>) => Doc,
    options: ParserOptions<AstNode>
  ): Doc {
    return this.items.length > 0
      ? printSeparatedItem(printPreservingEmptyLines(path, print, options), {
          firstSeparator: hardline,
          grouped: false
        })
      : '';
  }
}
