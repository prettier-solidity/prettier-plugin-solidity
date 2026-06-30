import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { CatchClause } from './CatchClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class CatchClauses extends NodeCollection<
  ast.CatchClauses,
  CatchClause
> {
  readonly kind = NonterminalKind.CatchClauses;

  constructor(ast: ast.CatchClauses, collected: CollectedMetadata) {
    super(ast, collected, CatchClause);

    this.updateMetadata(...this.items);
  }

  print(print: PrintFunction, path: AstPath<CatchClauses>): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
