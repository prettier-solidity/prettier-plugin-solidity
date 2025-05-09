import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { CatchClauseError } from './CatchClauseError.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class CatchClause implements SlangNode {
  readonly kind = NonterminalKind.CatchClause;

  comments;

  loc;

  error?: CatchClauseError;

  body: Block;

  constructor(ast: ast.CatchClause) {
    let metadata = getNodeMetadata(ast);

    if (ast.error) {
      this.error = new CatchClauseError(ast.error);
    }
    this.body = new Block(ast.body);

    metadata = updateMetadata(metadata, [this.error, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<CatchClause>, print: PrintFunction): Doc {
    return ['catch ', path.call(print, 'error'), path.call(print, 'body')];
  }
}
