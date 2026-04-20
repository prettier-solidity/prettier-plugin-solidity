import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class YulEqualAndColon extends SimpleStatement {
  readonly kind = NonterminalKind.YulEqualAndColon;

  constructor(ast: ast.YulEqualAndColon, collected: CollectedMetadata) {
    super(ast, collected, '=:');
  }
}
