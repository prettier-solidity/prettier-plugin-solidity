import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class YulLeaveStatement extends SlangNode {
  readonly kind = NonterminalKind.YulLeaveStatement;

  constructor(ast: ast.YulLeaveStatement, options: ParserOptions<AstNode>) {
    super(ast, options);
  }

  print(): Doc {
    return 'leave';
  }
}
