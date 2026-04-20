import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class YulBreakStatement extends SimpleStatement {
  readonly kind = NonterminalKind.YulBreakStatement;

  constructor(ast: ast.YulBreakStatement, collected: CollectedMetadata) {
    super(ast, collected, 'break');
  }
}
