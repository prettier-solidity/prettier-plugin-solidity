import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class ThrowStatement implements SlangNode {
  readonly kind = NonterminalKind.ThrowStatement;

  comments;

  loc;

  constructor(ast: ast.ThrowStatement) {
    [this.loc, this.comments] = getNodeMetadata(ast);
  }

  print(): Doc {
    return 'throw;';
  }
}
