import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class BreakStatement extends SimpleStatement {
  readonly kind = NonterminalKind.BreakStatement;

  constructor(ast: ast.BreakStatement, collected: CollectedMetadata) {
    super(ast, collected, 'break;');
  }
}
