import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class IndexAccessEnd implements SlangNode {
  readonly kind = NonterminalKind.IndexAccessEnd;

  comments;

  loc;

  end?: Expression;

  constructor(ast: ast.IndexAccessEnd, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    if (ast.end) {
      this.end = new Expression(ast.end, options);
    }

    metadata = updateMetadata(metadata, [this.end]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<IndexAccessEnd>, print: PrintFunction): Doc {
    return [':', path.call(print, 'end')];
  }
}
