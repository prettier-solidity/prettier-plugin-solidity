import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class NumberUnit extends SlangNode {
  readonly kind = NonterminalKind.NumberUnit;

  variant: string;

  constructor(ast: ast.NumberUnit, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
