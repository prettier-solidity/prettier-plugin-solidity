import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class YulLeaveStatement implements SlangNode {
  readonly kind = NonterminalKind.YulLeaveStatement;

  comments;

  loc;

  constructor(ast: ast.YulLeaveStatement) {
    const metadata = getNodeMetadata(ast);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return 'leave';
  }
}
