import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { join } = doc.builders;

export class YulForStatement extends SlangNode {
  readonly kind = NonterminalKind.YulForStatement;

  initialization: YulBlock;

  condition: YulExpression['variant'];

  iterator: YulBlock;

  body: YulBlock;

  constructor(ast: ast.YulForStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.initialization = new YulBlock(ast.initialization, options);
    this.condition = extractVariant(new YulExpression(ast.condition, options));
    this.iterator = new YulBlock(ast.iterator, options);
    this.body = new YulBlock(ast.body, options);

    this.updateMetadata(
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    );
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
