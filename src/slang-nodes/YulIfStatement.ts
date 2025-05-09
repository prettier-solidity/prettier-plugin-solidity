import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulExpression } from './YulExpression.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulIfStatement implements SlangNode {
  readonly kind = NonterminalKind.YulIfStatement;

  comments;

  loc;

  condition: YulExpression;

  body: YulBlock;

  constructor(ast: ast.YulIfStatement) {
    let metadata = getNodeMetadata(ast);

    this.condition = new YulExpression(ast.condition);
    this.body = new YulBlock(ast.body);

    metadata = updateMetadata(metadata, [this.condition, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulIfStatement>, print: PrintFunction): Doc {
    return [
      'if ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
