import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

const { line } = doc.builders;

export class YulReturnVariables implements SlangNode {
  readonly kind = NonterminalKind.YulReturnVariables;

  comments;

  loc;

  items: string[];

  separators: string[];

  constructor(ast: ast.YulReturnVariables, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.items = ast.items.map((item) => item.text);
    this.separators = ast.separators.map((separator) => separator.text);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return printSeparatedList(this.items, {
      firstSeparator: line,
      lastSeparator: ''
    });
  }
}
