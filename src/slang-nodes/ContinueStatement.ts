import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class ContinueStatement implements SlangNode {
  readonly kind = NonterminalKind.ContinueStatement;

  comments;

  loc;

  constructor(ast: ast.ContinueStatement) {
    [this.loc, this.comments] = getNodeMetadata(ast);
  }

  print(): Doc {
    return 'continue;';
  }
}
