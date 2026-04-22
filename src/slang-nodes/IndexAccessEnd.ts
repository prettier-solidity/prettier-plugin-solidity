import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class IndexAccessEnd extends SlangNode {
  readonly kind = NonterminalKind.IndexAccessEnd;

  end?: Expression['variant'];

  constructor(ast: ast.IndexAccessEnd, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.end) {
      this.end = extractVariant(new Expression(ast.end, collected));
    }

    this.updateMetadata(this.end);
  }

  print(print: PrintFunction): Doc {
    return [':', print('end')];
  }
}
