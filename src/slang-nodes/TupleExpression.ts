import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TupleValues } from './TupleValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TupleExpression extends SlangNode {
  readonly kind = NonterminalKind.TupleExpression;

  items: TupleValues;

  constructor(ast: ast.TupleExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.items = new TupleValues(ast.items, collected);

    this.updateMetadata(this.items);
  }

  print(print: PrintFunction): Doc {
    return ['(', print('items'), ')'];
  }
}
