import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class ContinueStatement extends SlangNode {
  readonly kind = NonterminalKind.ContinueStatement;

  constructor(ast: ast.ContinueStatement) {
    super(ast);
  }

  print(): Doc {
    return 'continue;';
  }
}
