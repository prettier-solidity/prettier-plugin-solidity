const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class FunctionTypeAttribute extends SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttribute;

  variant: string;

  constructor(ast: ast.FunctionTypeAttribute) {
    super(ast);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
