import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join } = doc.builders;

export class YulForStatement implements SlangNode {
  readonly kind = NonterminalKind.YulForStatement;

  comments;

  loc;

  initialization: YulBlock;

  condition: YulExpression;

  iterator: YulBlock;

  body: YulBlock;

  constructor(ast: ast.YulForStatement) {
    let metadata = getNodeMetadata(ast);

    this.initialization = new YulBlock(ast.initialization);
    this.condition = new YulExpression(ast.condition);
    this.iterator = new YulBlock(ast.iterator);
    this.body = new YulBlock(ast.body);

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
