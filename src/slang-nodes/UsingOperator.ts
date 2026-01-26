import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class UsingOperator extends SlangNode {
  readonly kind = NonterminalKind.UsingOperator;

  variant: string;

  constructor(ast: ast.UsingOperator, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
