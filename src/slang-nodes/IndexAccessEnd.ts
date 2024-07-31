import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class IndexAccessEnd implements SlangNode {
  readonly kind = NonterminalKind.IndexAccessEnd;

  comments;

  loc;

  colon: string;

  end?: Expression;

  constructor(
    ast: ast.IndexAccessEnd,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.colon = ast.colon.text;
    if (ast.end) {
      this.end = new Expression(ast.end, offsets[0], options);
    }

    metadata = updateMetadata(metadata, [this.end]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
