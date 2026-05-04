import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { CatchClause } from './CatchClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class CatchClauses extends SlangNode {
  readonly kind = NonterminalKind.CatchClauses;

  items: CatchClause[];

  constructor(ast: ast.CatchClauses, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new CatchClause(item, collected));

    this.updateMetadata(...this.items);
  }

  print(print: PrintFunction, path: AstPath<CatchClauses>): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
