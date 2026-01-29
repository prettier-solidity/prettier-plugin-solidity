import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class IdentifierPath extends SlangNode {
  readonly kind = NonterminalKind.IdentifierPath;

  items: TerminalNode[];

  constructor(ast: ast.IdentifierPath, collected: CollectedMetadata) {
    super(ast, collected);

    this.items = ast.items.map((item) => new TerminalNode(item, collected));
  }

  print(path: AstPath<IdentifierPath>, print: PrintFunction): Doc {
    return join('.', path.map(print, 'items'));
  }
}
