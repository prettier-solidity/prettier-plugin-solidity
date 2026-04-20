import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class YulContinueStatement extends SimpleStatement {
  readonly kind = NonterminalKind.YulContinueStatement;

  constructor(ast: ast.YulContinueStatement, collected: CollectedMetadata) {
    super(ast, collected, 'continue');
  }
}
