import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printComments } from '../slang-printers/print-comments.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class PositionalArguments extends SlangNode {
  readonly kind = NonterminalKind.PositionalArguments;

  items: Expression['variant'][];

  constructor(ast: ast.PositionalArguments, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new Expression(item, options))
    );
  }

  print(
    path: AstPath<PositionalArguments>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'));
    }
    const argumentComments = printComments(path, options);

    return argumentComments.length > 0
      ? printSeparatedItem(argumentComments)
      : '';
  }
}
