import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { join } from '../slang-printers/prettier-builders.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class SimpleVersionLiteral extends SlangNode {
  readonly kind = NonterminalKind.SimpleVersionLiteral;

  items: TerminalNode[];

  constructor(ast: ast.SimpleVersionLiteral, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new TerminalNode(item, collected));
  }

  print(print: PrintFunction, path: AstPath<SimpleVersionLiteral>): Doc {
    return join('.', path.map(print, 'items'));
  }
}
