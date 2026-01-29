import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class VersionOperator extends SlangNode {
  readonly kind = NonterminalKind.VersionOperator;

  variant: string;

  constructor(ast: ast.VersionOperator, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
