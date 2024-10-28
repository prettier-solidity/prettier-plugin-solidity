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
    const metadata = getNodeMetadata(ast);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return 'continue;';
  }
}
