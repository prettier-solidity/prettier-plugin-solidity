const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class EnumMembers extends SlangNode {
  readonly kind = NonterminalKind.EnumMembers;

  items: Identifier[];

  constructor(ast: ast.EnumMembers) {
    super(ast, true);

    this.items = ast.items.map((item) => new Identifier(item));
  }

  print(path: AstPath<EnumMembers>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: hardline
    });
  }
}
