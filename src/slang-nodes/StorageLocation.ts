import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class StorageLocation implements SlangNode {
  readonly kind = NonterminalKind.StorageLocation;

  comments;

  loc;

  variant: string;

  constructor(ast: ast.StorageLocation, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.variant = ast.variant.unparse();

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.variant;
  }
}
