const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class YulIfStatement extends SlangNode {
  readonly kind = NonterminalKind.YulIfStatement;

  condition: YulExpression;

  body: YulBlock;

  constructor(ast: ast.YulIfStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.condition = new YulExpression(ast.condition, options);
    this.body = new YulBlock(ast.body, options);

    this.updateMetadata(this.condition, this.body);
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
