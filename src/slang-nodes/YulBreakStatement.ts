import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class YulBreakStatement extends SlangNode {
  readonly kind = NonterminalKind.YulBreakStatement;

  constructor(ast: ast.YulBreakStatement) {
    super(ast);
  }

  print(): Doc {
    return 'break';
  }
}
