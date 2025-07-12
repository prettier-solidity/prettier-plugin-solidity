import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class StorageLocation extends SlangNode {
  readonly kind = NonterminalKind.StorageLocation;

  variant: string;

  constructor(ast: ast.StorageLocation) {
    super(ast);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
