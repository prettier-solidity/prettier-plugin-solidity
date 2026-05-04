import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ArrayValues } from './ArrayValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ArrayExpression extends SlangNode {
  readonly kind = NonterminalKind.ArrayExpression;

  items: ArrayValues;

  constructor(ast: ast.ArrayExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.items = new ArrayValues(ast.items, collected);

    this.updateMetadata(this.items);
  }

  print(print: PrintFunction): Doc {
    return ['[', print('items'), ']'];
  }
}
