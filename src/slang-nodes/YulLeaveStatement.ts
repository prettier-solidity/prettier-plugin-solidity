import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class YulLeaveStatement extends SlangNode {
  readonly kind = NonterminalKind.YulLeaveStatement;

  constructor(ast: ast.YulLeaveStatement, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(): Doc {
    return 'leave';
  }
}
