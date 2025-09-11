import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { SlangNode } from './SlangNode.js';
import { Parameter } from './Parameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class Parameters extends SlangNode {
  readonly kind = NonterminalKind.Parameters;

  items: Parameter[];

  constructor(ast: ast.Parameters, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new Parameter(item, options));
  }

  print(
    path: AstPath<Parameters>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'), { grouped: false });
    }

    const parameterComments = printComments(path, options);

    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
}
