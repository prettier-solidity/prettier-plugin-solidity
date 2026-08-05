import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { hardline } from '../slang-printers/prettier-builders.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { StructMember } from './StructMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class StructMembers extends SlangNode {
  readonly kind = NonterminalKind.StructMembers;

  items: StructMember[];

  constructor(ast: ast.StructMembers, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new StructMember(item, collected));
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
