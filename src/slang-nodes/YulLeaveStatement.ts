import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class YulLeaveStatement extends SimpleStatement {
  readonly kind = NonterminalKind.YulLeaveStatement;

  constructor(ast: ast.YulLeaveStatement, collected: CollectedMetadata) {
    super(ast, collected, 'leave');
  }
}
