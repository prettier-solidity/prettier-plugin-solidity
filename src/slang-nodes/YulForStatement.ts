import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class YulForStatement extends SlangNode {
  readonly kind = NonterminalKind.YulForStatement;

  initialization: YulBlock;

  condition: YulExpression['variant'];

  iterator: YulBlock;

  body: YulBlock;

  constructor(ast: ast.YulForStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.initialization = new YulBlock(ast.initialization, collected);
    this.condition = extractVariant(
      new YulExpression(ast.condition, collected)
    );
    this.iterator = new YulBlock(ast.iterator, collected);
    this.body = new YulBlock(ast.body, collected);

    this.updateMetadata(
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    );
  }

  print(print: PrintFunction): Doc {
    return join(' ', [
      'for',
      print('initialization'),
      print('condition'),
      print('iterator'),
      print('body')
    ]);
  }
}
