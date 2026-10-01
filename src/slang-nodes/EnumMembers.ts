import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { hardline } from '../slang-printers/prettier-builders.ts';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class EnumMembers extends SlangNode {
  readonly kind = NonterminalKind.EnumMembers;

  items: TerminalNode[];

  constructor(ast: ast.EnumMembers, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new TerminalNode(item, collected));
  }

  print(print: PrintFunction, path: AstPath<EnumMembers>): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: hardline
    });
  }
}
