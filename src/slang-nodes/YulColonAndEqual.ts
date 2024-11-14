import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class YulColonAndEqual implements SlangNode {
  readonly kind = NonterminalKind.YulColonAndEqual;

  comments;

  loc;

  constructor(ast: ast.YulColonAndEqual) {
    const metadata = getNodeMetadata(ast);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return ':=';
  }
}
