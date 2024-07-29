import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { CatchClauseError } from './CatchClauseError.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class CatchClause implements SlangNode {
  readonly kind = NonterminalKind.CatchClause;

  comments;

  loc;

  catchKeyword: string;

  error?: CatchClauseError;

  body: Block;

  constructor(ast: ast.CatchClause, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.catchKeyword = ast.catchKeyword.text;
    let i = 0;
    if (ast.error) {
      this.error = new CatchClauseError(ast.error, offsets[i], options);
      i += 1;
    }
    this.body = new Block(ast.body, offsets[i], options);

    metadata = updateMetadata(metadata, [this.error, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.catchKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'body')
    ];
  }
}
