import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class EnumMembers extends SlangNode {
  readonly kind = NonterminalKind.EnumMembers;

  items: TerminalNode[];

  constructor(ast: ast.EnumMembers) {
    super(ast, true);

    this.items = ast.items.map((item) => new TerminalNode(item));
  }

  print(path: AstPath<EnumMembers>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: hardline
    });
  }
}
