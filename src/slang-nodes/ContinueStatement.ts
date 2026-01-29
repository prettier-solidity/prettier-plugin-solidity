import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class ContinueStatement extends SlangNode {
  readonly kind = NonterminalKind.ContinueStatement;

  constructor(ast: ast.ContinueStatement, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(): Doc {
    return 'continue;';
  }
}
