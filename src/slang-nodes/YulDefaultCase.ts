import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulDefaultCase implements SlangNode {
  readonly kind = NonterminalKind.YulDefaultCase;

  comments;

  loc;

  body: YulBlock;

  constructor(ast: ast.YulDefaultCase) {
    let metadata = getNodeMetadata(ast);

    this.body = new YulBlock(ast.body);

    metadata = updateMetadata(metadata, [this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulDefaultCase>, print: PrintFunction): Doc {
    return ['default ', path.call(print, 'body')];
  }
}
