import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { join } from '../slang-printers/prettier-builders.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class IdentifierPath extends SlangNode {
  readonly kind = NonterminalKind.IdentifierPath;

  items: TerminalNode[];

  constructor(ast: ast.IdentifierPath, collected: CollectedMetadata) {
    super(ast, collected);

    this.items = ast.items.map((item) => new TerminalNode(item, collected));
  }

  print(print: PrintFunction, path: AstPath<IdentifierPath>): Doc {
    return join('.', path.map(print, 'items'));
  }
}
