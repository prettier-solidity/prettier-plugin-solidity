import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class BreakStatement extends SlangNode {
  readonly kind = NonterminalKind.BreakStatement;

  constructor(ast: ast.BreakStatement, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(): Doc {
    return 'break;';
  }
}
