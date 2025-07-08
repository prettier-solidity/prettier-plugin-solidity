import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class NumberUnit implements SlangNode {
  readonly kind = NonterminalKind.NumberUnit;

  comments;

  loc;

  variant: string;

  constructor(ast: ast.NumberUnit) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
