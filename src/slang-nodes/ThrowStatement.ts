import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class ThrowStatement extends SlangNode {
  readonly kind = NonterminalKind.ThrowStatement;

  constructor(ast: ast.ThrowStatement, options: ParserOptions<AstNode>) {
    super(ast, options);
  }

  print(): Doc {
    return 'throw;';
  }
}
