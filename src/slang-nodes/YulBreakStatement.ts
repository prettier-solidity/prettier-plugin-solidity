import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class YulBreakStatement extends SlangNode {
  readonly kind = NonterminalKind.YulBreakStatement;

  constructor(ast: ast.YulBreakStatement, options: ParserOptions<AstNode>) {
    super(ast, options);
  }

  print(): Doc {
    return 'break';
  }
}
