import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class ThrowStatement extends SlangNode {
  readonly kind = NonterminalKind.ThrowStatement;

  constructor(ast: ast.ThrowStatement) {
    super(ast);
  }

  print(): Doc {
    return 'throw;';
  }
}
