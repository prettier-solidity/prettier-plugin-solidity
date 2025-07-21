import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class YulLeaveStatement extends SlangNode {
  readonly kind = NonterminalKind.YulLeaveStatement;

  constructor(ast: ast.YulLeaveStatement) {
    super(ast);
  }

  print(): Doc {
    return 'leave';
  }
}
