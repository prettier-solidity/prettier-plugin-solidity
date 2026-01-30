import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class YulBreakStatement extends SlangNode {
  readonly kind = NonterminalKind.YulBreakStatement;

  constructor(ast: ast.YulBreakStatement, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(): Doc {
    return 'break';
  }
}
