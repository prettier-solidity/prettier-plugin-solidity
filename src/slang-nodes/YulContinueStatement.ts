import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class YulContinueStatement extends SlangNode {
  readonly kind = NonterminalKind.YulContinueStatement;

  constructor(ast: ast.YulContinueStatement, options: ParserOptions<AstNode>) {
    super(ast, options);
  }

  print(): Doc {
    return 'continue';
  }
}
