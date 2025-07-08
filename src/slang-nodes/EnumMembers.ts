import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { hardline } = doc.builders;

export class EnumMembers implements SlangNode {
  readonly kind = NonterminalKind.EnumMembers;

  comments;

  loc;

  items: Identifier[];

  constructor(ast: ast.EnumMembers) {
    [this.loc, this.comments] = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new Identifier(item));
  }

  print(path: AstPath<EnumMembers>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: hardline
    });
  }
}
