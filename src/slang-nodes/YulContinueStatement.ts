import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class YulContinueStatement extends SlangNode {
  readonly kind = NonterminalKind.YulContinueStatement;

  constructor(ast: ast.YulContinueStatement, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(): Doc {
    return 'continue';
  }
}
