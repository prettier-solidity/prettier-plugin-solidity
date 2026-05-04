import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';
import { TupleValue } from './TupleValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { Expression } from './Expression.ts';

export class TupleValues extends SlangNode {
  readonly kind = NonterminalKind.TupleValues;

  items: TupleValue[];

  constructor(ast: ast.TupleValues, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new TupleValue(item, collected));
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
