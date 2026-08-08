import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { NodeCollection } from './NodeCollection.js';
import { Parameter } from './Parameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class Parameters extends NodeCollection<ast.Parameters, Parameter> {
  readonly kind = NonterminalKind.Parameters;

  constructor(ast: ast.Parameters, collected: CollectedMetadata) {
    super(ast, collected, Parameter);
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
