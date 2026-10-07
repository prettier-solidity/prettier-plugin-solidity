import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { hardline } from '../slang-printers/prettier-builders.ts';
import { printComments } from '../slang-printers/print-comments.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { StructMember } from './StructMember.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.js';

export class StructMembers extends SlangNode {
  readonly kind = NonterminalKind.StructMembers;

  items: StructMember[];

  constructor(ast: ast.StructMembers, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new StructMember(item, collected));
  }

  print(
    print: PrintFunction,
    path: AstPath<StructMembers>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'), {
        firstSeparator: hardline,
        separator: hardline
      });
    }

    const memberComments = printComments(this, path, options);

    return memberComments.length > 0 ? printSeparatedItem(memberComments) : '';
  }
}
