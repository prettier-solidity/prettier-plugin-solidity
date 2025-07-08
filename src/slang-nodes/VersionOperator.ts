import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class VersionOperator implements SlangNode {
  readonly kind = NonterminalKind.VersionOperator;

  comments;

  loc;

  variant: string;

  constructor(ast: ast.VersionOperator) {
    const metadata = getNodeMetadata(ast);

    this.variant = ast.variant.unparse();

    [this.loc, this.comments] = metadata;
  }

  print(): Doc {
    return this.variant;
  }
}
