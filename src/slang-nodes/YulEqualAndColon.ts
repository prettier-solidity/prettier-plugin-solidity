import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class YulEqualAndColon implements SlangNode {
  readonly kind = NonterminalKind.YulEqualAndColon;

  comments;

  loc;

  constructor(ast: ast.YulEqualAndColon, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return '=:';
  }
}
