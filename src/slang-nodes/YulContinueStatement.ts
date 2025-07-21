import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class YulContinueStatement extends SlangNode {
  readonly kind = NonterminalKind.YulContinueStatement;

  constructor(ast: ast.YulContinueStatement) {
    super(ast);
  }

  print(): Doc {
    return 'continue';
  }
}
