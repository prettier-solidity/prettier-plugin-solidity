import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class YulParameters extends SlangNode {
  readonly kind = NonterminalKind.YulParameters;

  items: TerminalNode[];

  constructor(ast: ast.YulParameters) {
    super(ast, true);

    this.items = ast.items.map((item) => new TerminalNode(item));
  }

  print(path: AstPath<YulParameters>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
