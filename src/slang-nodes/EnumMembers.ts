import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
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

  separators: string[];

  constructor(ast: ast.EnumMembers) {
    super(ast);

    this.items = ast.items.map((item) => new Identifier(item));
    this.separators = ast.separators.map((separator) => separator.unparse());
  }

  print(path: AstPath<EnumMembers>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: hardline
    });
  }
}
