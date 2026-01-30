import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ImportAlias extends SlangNode {
  readonly kind = NonterminalKind.ImportAlias;

  identifier: TerminalNode;

  constructor(ast: ast.ImportAlias, collected: CollectedMetadata) {
    super(ast, collected);

    this.identifier = new TerminalNode(ast.identifier, collected);
  }

  print(path: AstPath<ImportAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'identifier')];
  }
}
