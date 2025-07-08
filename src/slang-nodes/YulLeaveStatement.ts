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
    [this.loc, this.comments] = getNodeMetadata(ast);
  }

  print(): Doc {
    return 'leave';
  }
}
