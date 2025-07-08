import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class BreakStatement extends SlangNode {
  readonly kind = NonterminalKind.BreakStatement;

  constructor(ast: ast.BreakStatement) {
    super(ast);
  }

  print(): Doc {
    return 'break;';
  }
}
