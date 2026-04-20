import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class ContinueStatement extends SimpleStatement {
  readonly kind = NonterminalKind.ContinueStatement;

  constructor(ast: ast.ContinueStatement, collected: CollectedMetadata) {
    super(ast, collected, 'continue;');
  }
}
