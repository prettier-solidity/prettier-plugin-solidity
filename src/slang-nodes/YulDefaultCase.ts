import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class YulDefaultCase implements SlangNode {
  readonly kind = NonterminalKind.YulDefaultCase;

  comments;

  loc;

  defaultKeyword: string;

  body: YulBlock;

  constructor(
    ast: ast.YulDefaultCase,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.defaultKeyword = ast.defaultKeyword.text;
    this.body = new YulBlock(ast.body, offsets[0], options);

    metadata = updateMetadata(metadata, [this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<YulDefaultCase>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`${this.defaultKeyword} `, path.call(print, 'body')];
  }
}
