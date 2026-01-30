import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class YulColonAndEqual extends SlangNode {
  readonly kind = NonterminalKind.YulColonAndEqual;

  constructor(ast: ast.YulColonAndEqual, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(): Doc {
    return ':=';
  }
}
