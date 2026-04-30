import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulValueCase extends SlangNode {
  readonly kind = NonterminalKind.YulValueCase;

  value: YulLiteral['variant'];

  body: YulBlock;

  constructor(ast: ast.YulValueCase, collected: CollectedMetadata) {
    super(ast, collected);

    this.value = extractVariant(new YulLiteral(ast.value, collected));
    this.body = new YulBlock(ast.body, collected);

    this.updateMetadata(this.value, this.body);
  }

  print(print: PrintFunction): Doc {
    return ['case ', print('value'), ' ', print('body')];
  }
}
