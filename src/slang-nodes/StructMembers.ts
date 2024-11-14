import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StructMember } from './StructMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { hardline } = doc.builders;

export class StructMembers implements SlangNode {
  readonly kind = NonterminalKind.StructMembers;

  comments;

  loc;

  items: StructMember[];

  constructor(ast: ast.StructMembers, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new StructMember(item, options));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<StructMembers>, print: PrintFunction): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'), {
          firstSeparator: hardline,
          separator: hardline
        })
      : '';
  }
}
