const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class YulValueCase extends SlangNode {
  readonly kind = NonterminalKind.YulValueCase;

  value: YulLiteral;

  body: YulBlock;

  constructor(ast: ast.YulValueCase, options: ParserOptions<AstNode>) {
    super(ast);

    this.value = new YulLiteral(ast.value, options);
    this.body = new YulBlock(ast.body, options);

    this.updateMetadata(this.value, this.body);
  }

  print(path: AstPath<YulValueCase>, print: PrintFunction): Doc {
    return ['case ', path.call(print, 'value'), ' ', path.call(print, 'body')];
  }
}
