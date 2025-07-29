import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class YulVariableNames extends SlangNode {
  readonly kind = NonterminalKind.YulVariableNames;

  items: TerminalNode[];

  constructor(ast: ast.YulVariableNames) {
    super(ast, true);

    this.items = ast.items.map((item) => new TerminalNode(item));
  }

  print(path: AstPath<YulVariableNames>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line,
      lastSeparator: ''
    });
  }
}
