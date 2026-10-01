import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { printComments } from '../slang-printers/print-comments.ts';
import { SlangNode } from './SlangNode.ts';
import { Parameter } from './Parameter.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class Parameters extends SlangNode {
  readonly kind = NonterminalKind.Parameters;

  items: Parameter[];

  constructor(ast: ast.Parameters, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new Parameter(item, collected));
  }

  print(
    print: PrintFunction,
    path: AstPath<Parameters>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'), { grouped: false });
    }

    const parameterComments = printComments(this, path, options);

    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
}
