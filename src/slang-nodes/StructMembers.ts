import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { StructMember } from './StructMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class StructMembers extends NodeCollection<
  ast.StructMembers,
  StructMember
> {
  readonly kind = NonterminalKind.StructMembers;

  constructor(ast: ast.StructMembers, collected: CollectedMetadata) {
    super(ast, collected, StructMember);
  }

  print(print: PrintFunction, path: AstPath<StructMembers>): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'), {
          firstSeparator: hardline,
          separator: hardline
        })
      : '';
  }
}
