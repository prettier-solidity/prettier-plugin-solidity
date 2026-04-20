import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class ThrowStatement extends SimpleStatement {
  readonly kind = NonterminalKind.ThrowStatement;

  constructor(ast: ast.ThrowStatement, collected: CollectedMetadata) {
    super(ast, collected, 'throw;');
  }
}
