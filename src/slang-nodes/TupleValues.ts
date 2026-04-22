import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { NodeCollection } from './NodeCollection.js';
import { TupleValue } from './TupleValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { Expression } from './Expression.ts';

export class TupleValues extends NodeCollection<ast.TupleValues, TupleValue> {
  readonly kind = NonterminalKind.TupleValues;

  constructor(ast: ast.TupleValues, collected: CollectedMetadata) {
    super(ast, collected, TupleValue);
  }

  getSingleExpression(): Expression['variant'] | undefined {
    const items = this.items;
    return items.length === 1 ? items[0].expression : undefined;
  }

  print(print: PrintFunction, path: AstPath<TupleValues>): Doc {
    const singleExpression = this.getSingleExpression();
    const items = path.map(print, 'items');
    return singleExpression && isBinaryOperation(singleExpression)
      ? items
      : printSeparatedList(items);
  }
}
