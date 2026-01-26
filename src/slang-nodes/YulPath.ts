import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

const { join } = doc.builders;

export class YulPath extends SlangNode {
  readonly kind = NonterminalKind.YulPath;

  items: TerminalNode[];

  constructor(ast: ast.YulPath, options: ParserOptions<AstNode>) {
    super(ast, options, true);

    this.items = ast.items.map((item) => new TerminalNode(item, options));
  }

  print(path: AstPath<YulPath>, print: PrintFunction): Doc {
    return join('.', path.map(print, 'items'));
  }
}
