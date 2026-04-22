import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class IdentifierPath extends NodeCollection<
  ast.IdentifierPath,
  TerminalNode
> {
  readonly kind = NonterminalKind.IdentifierPath;

  constructor(ast: ast.IdentifierPath, collected: CollectedMetadata) {
    super(ast, collected, TerminalNode, false);
  }

  print(print: PrintFunction, path: AstPath<IdentifierPath>): Doc {
    return join('.', path.map(print, 'items'));
  }
}
