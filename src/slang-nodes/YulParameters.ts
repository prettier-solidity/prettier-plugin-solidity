const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class YulParameters extends SlangNode {
  readonly kind = NonterminalKind.YulParameters;

  items: YulIdentifier[];

  constructor(ast: ast.YulParameters) {
    super(ast, true);

    this.items = ast.items.map((item) => new YulIdentifier(item));
  }

  print(path: AstPath<YulParameters>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
