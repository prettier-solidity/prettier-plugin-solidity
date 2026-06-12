import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { VariantCollection } from './VariantCollection.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ArrayValues extends VariantCollection<
  ast.ArrayValues,
  Expression
> {
  readonly kind = NonterminalKind.ArrayValues;

  constructor(ast: ast.ArrayValues, collected: CollectedMetadata) {
    super(ast, collected, Expression);
  }

  print(print: PrintFunction, path: AstPath<ArrayValues>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
