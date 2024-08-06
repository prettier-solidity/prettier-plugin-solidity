import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class YulValueCase implements SlangNode {
  readonly kind = NonterminalKind.YulValueCase;

  comments;

  loc;

  value: YulLiteral;

  body: YulBlock;

  constructor(
    ast: ast.YulValueCase,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.value = new YulLiteral(ast.value, offsets[0], options);
    this.body = new YulBlock(ast.body, offsets[1], options);

    metadata = updateMetadata(metadata, [this.value, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulValueCase>, print: PrintFunction): Doc {
    return ['case ', path.call(print, 'value'), ' ', path.call(print, 'body')];
  }
}
