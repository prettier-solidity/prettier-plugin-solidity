import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SimpleStatement } from './SimpleStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class YulColonAndEqual extends SimpleStatement {
  readonly kind = NonterminalKind.YulColonAndEqual;

  constructor(ast: ast.YulColonAndEqual, collected: CollectedMetadata) {
    super(ast, collected, ':=');
  }
}
