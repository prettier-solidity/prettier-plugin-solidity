import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulValueCase implements SlangNode {
  readonly kind = NonterminalKind.YulValueCase;

  comments;

  loc;

  value: YulLiteral;

  body: YulBlock;

  constructor(ast: ast.YulValueCase, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.value = new YulLiteral(ast.value, options);
    this.body = new YulBlock(ast.body, options);

    metadata = updateMetadata(metadata, [this.value, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulValueCase>, print: PrintFunction): Doc {
    return ['case ', path.call(print, 'value'), ' ', path.call(print, 'body')];
  }
}
