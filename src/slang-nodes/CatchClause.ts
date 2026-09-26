import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.ts';
import { CatchClauseError } from './CatchClauseError.ts';
import { Block } from './Block.ts';

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
