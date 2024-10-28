import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulDefaultCase implements SlangNode {
  readonly kind = NonterminalKind.YulDefaultCase;

  comments;

  loc;

  body: YulBlock;

  constructor(ast: ast.YulDefaultCase, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.body = new YulBlock(ast.body, options);

    metadata = updateMetadata(metadata, [this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulDefaultCase>, print: PrintFunction): Doc {
    return ['default ', path.call(print, 'body')];
  }
}
