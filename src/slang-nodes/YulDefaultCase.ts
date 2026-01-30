import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulDefaultCase extends SlangNode {
  readonly kind = NonterminalKind.YulDefaultCase;

  body: YulBlock;

  constructor(
    ast: ast.YulDefaultCase,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.body = new YulBlock(ast.body, collected, options);

    this.updateMetadata(this.body);
  }

  print(path: AstPath<YulDefaultCase>, print: PrintFunction): Doc {
    return ['default ', path.call(print, 'body')];
  }
}
