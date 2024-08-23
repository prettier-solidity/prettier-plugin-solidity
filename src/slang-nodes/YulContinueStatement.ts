import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class YulContinueStatement implements SlangNode {
  readonly kind = NonterminalKind.YulContinueStatement;

  comments;

  loc;

  constructor(ast: ast.YulContinueStatement) {
    const metadata = getNodeMetadata(ast);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return 'continue';
  }
}
