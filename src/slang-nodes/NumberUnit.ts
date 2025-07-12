import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class NumberUnit extends SlangNode {
  readonly kind = NonterminalKind.NumberUnit;

  variant: string;

  constructor(ast: ast.NumberUnit) {
    super(ast);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
