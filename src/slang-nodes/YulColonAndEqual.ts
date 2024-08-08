import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class YulColonAndEqual implements SlangNode {
  readonly kind = NonterminalKind.YulColonAndEqual;

  comments;

  loc;

  constructor(ast: ast.YulColonAndEqual, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return ':=';
  }
}
