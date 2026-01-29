import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulParameters extends SlangNode {
  readonly kind = NonterminalKind.YulParameters;

  items: TerminalNode[];

  constructor(ast: ast.YulParameters, options: ParserOptions<AstNode>) {
    super(ast, options, true);

    this.items = ast.items.map((item) => new TerminalNode(item, options));
  }

  print(path: AstPath<YulParameters>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
