import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata } from '../slang-utils/get-offsets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.js';

const { hardline } = doc.builders;

export class EnumMembers implements SlangNode {
  readonly kind = NonterminalKind.EnumMembers;

  comments;

  loc;

  items: string[];

  separators: string[];

  constructor(ast: ast.EnumMembers, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.items = ast.items.map((item) => item.text);
    this.separators = ast.separators.map((separator) => separator.text);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return printSeparatedList(this.items, { firstSeparator: hardline });
  }
}
