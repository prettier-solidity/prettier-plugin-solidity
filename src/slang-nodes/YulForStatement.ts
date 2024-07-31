import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class YulForStatement implements SlangNode {
  readonly kind = NonterminalKind.YulForStatement;

  comments;

  loc;

  forKeyword: string;

  initialization: YulBlock;

  condition: YulExpression;

  iterator: YulBlock;

  body: YulBlock;

  constructor(
    ast: ast.YulForStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.forKeyword = ast.forKeyword.text;
    this.initialization = new YulBlock(ast.initialization, offsets[0], options);
    this.condition = new YulExpression(ast.condition, offsets[1], options);
    this.iterator = new YulBlock(ast.iterator, offsets[2], options);
    this.body = new YulBlock(ast.body, offsets[3], options);

    metadata = updateMetadata(metadata, [
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.forKeyword} `,
      path.call(print, 'initialization'),
      ' ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'iterator'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
