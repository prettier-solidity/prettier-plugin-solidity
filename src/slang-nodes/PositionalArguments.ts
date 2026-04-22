import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printComments } from '../slang-printers/print-comments.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { VariantCollection } from './VariantCollection.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class PositionalArguments extends VariantCollection<
  ast.PositionalArguments,
  Expression
> {
  readonly kind = NonterminalKind.PositionalArguments;

  constructor(ast: ast.PositionalArguments, collected: CollectedMetadata) {
    super(ast, collected, Expression);
  }

  print(
    print: PrintFunction,
    path: AstPath<PositionalArguments>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'));
    }
    const argumentComments = printComments(this, path, options);

    return argumentComments.length > 0
      ? printSeparatedItem(argumentComments)
      : '';
  }
}
