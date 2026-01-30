import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class UsingOperator extends SlangNode {
  readonly kind = NonterminalKind.UsingOperator;

  variant: string;

  constructor(ast: ast.UsingOperator, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
