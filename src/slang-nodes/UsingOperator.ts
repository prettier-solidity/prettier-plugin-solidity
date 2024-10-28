import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class UsingOperator implements SlangNode {
  readonly kind = NonterminalKind.UsingOperator;

  comments;

  loc;

  variant: string;

  constructor(ast: ast.UsingOperator) {
    const metadata = getNodeMetadata(ast);

    this.variant = ast.variant.unparse();

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.variant;
  }
}
