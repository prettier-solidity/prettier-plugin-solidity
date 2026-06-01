import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class YulPath extends NodeCollection<ast.YulPath, TerminalNode> {
  readonly kind = NonterminalKind.YulPath;

  constructor(ast: ast.YulPath, collected: CollectedMetadata) {
    super(ast, collected, TerminalNode);
  }

  print(print: PrintFunction, path: AstPath<YulPath>): Doc {
    return join('.', path.map(print, 'items'));
  }
}
