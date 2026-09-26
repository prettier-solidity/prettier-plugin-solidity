import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printComments } from '../slang-printers/print-comments.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class PositionalArguments extends SlangNode {
  readonly kind = NonterminalKind.PositionalArguments;

  items: Expression['variant'][];

  constructor(ast: ast.PositionalArguments, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new Expression(item, collected))
    );
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
