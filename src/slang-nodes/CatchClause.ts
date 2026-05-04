import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { CatchClauseError } from './CatchClauseError.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class CatchClause extends SlangNode {
  readonly kind = NonterminalKind.CatchClause;

  error?: CatchClauseError;

  body: Block;

  constructor(ast: ast.CatchClause, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.error) {
      this.error = new CatchClauseError(ast.error, collected);
    }
    this.body = new Block(ast.body, collected);

    this.updateMetadata(this.error, this.body);
  }

  print(print: PrintFunction): Doc {
    return ['catch ', print('error'), print('body')];
  }
}
