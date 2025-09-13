import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulDefaultCase extends SlangNode {
  readonly kind = NonterminalKind.YulDefaultCase;

  body: YulBlock;

  constructor(ast: ast.YulDefaultCase, options: ParserOptions<AstNode>) {
    super(ast);

    this.body = new YulBlock(ast.body, options);

    this.updateMetadata(this.body);
  }

  print(path: AstPath<YulDefaultCase>, print: PrintFunction): Doc {
    return ['default ', path.call(print, 'body')];
  }
}
