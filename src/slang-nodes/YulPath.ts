import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class YulPath extends SlangNode {
  readonly kind = NonterminalKind.YulPath;

  items: TerminalNode[];

  constructor(ast: ast.YulPath) {
    super(ast, true);

    this.items = ast.items.map((item) => new TerminalNode(item));
  }

  print(path: AstPath<YulPath>, print: PrintFunction): Doc {
    return join('.', path.map(print, 'items'));
  }
}
