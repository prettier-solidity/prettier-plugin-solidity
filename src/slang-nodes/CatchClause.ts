import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { CatchClauseError } from './CatchClauseError.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class CatchClause extends SlangNode {
  readonly kind = NonterminalKind.CatchClause;

  error?: CatchClauseError;

  body: Block;

  constructor(ast: ast.CatchClause, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.error) {
      this.error = new CatchClauseError(ast.error, options);
    }
    this.body = new Block(ast.body, options);

    this.updateMetadata(this.error, this.body);
  }

  print(path: AstPath<CatchClause>, print: PrintFunction): Doc {
    return ['catch ', path.call(print, 'error'), path.call(print, 'body')];
  }
}
