import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class YulColonAndEqual extends SlangNode {
  readonly kind = NonterminalKind.YulColonAndEqual;

  constructor(ast: ast.YulColonAndEqual) {
    super(ast);
  }

  print(): Doc {
    return ':=';
  }
}
