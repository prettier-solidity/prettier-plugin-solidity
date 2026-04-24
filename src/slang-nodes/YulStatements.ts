import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { LineCollection } from './LineCollection.js';
import { YulStatement } from './YulStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class YulStatements extends LineCollection<
  ast.YulStatements,
  YulStatement
> {
  readonly kind = NonterminalKind.YulStatements;

  constructor(ast: ast.YulStatements, collected: CollectedMetadata) {
    super(ast, collected, YulStatement);
  }
}
