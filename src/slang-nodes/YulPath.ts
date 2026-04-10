import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class YulPath extends SlangNode {
  readonly kind = NonterminalKind.YulPath;

  items: TerminalNode[];

  constructor(ast: ast.YulPath, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new TerminalNode(item, collected));
  }

  print(print: PrintFunction, path: AstPath<YulPath>): Doc {
    return join('.', path.map(print, 'items'));
  }
}
