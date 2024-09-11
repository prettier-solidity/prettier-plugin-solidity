import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const { join } = doc.builders;

export class YulForStatement implements SlangNode {
  readonly kind = NonterminalKind.YulForStatement;

  comments;

  loc;

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

  print(path: AstPath<YulForStatement>, print: PrintFunction): Doc {
    return join(' ', [
      'for',
      path.call(print, 'initialization'),
      path.call(print, 'condition'),
      path.call(print, 'iterator'),
      path.call(print, 'body')
    ]);
  }
}