import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { LineCollection } from './LineCollection.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class Statements extends LineCollection<ast.Statements, Statement> {
  readonly kind = NonterminalKind.Statements;

  constructor(ast: ast.Statements, collected: CollectedMetadata) {
    super(ast, collected, Statement);
  }
}
