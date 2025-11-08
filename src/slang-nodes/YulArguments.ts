import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulArguments extends SlangNode {
  readonly kind = NonterminalKind.YulArguments;

  items: YulExpression['variant'][];

  constructor(ast: ast.YulArguments, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new YulExpression(item, options))
    );
  }

  print(path: AstPath<YulArguments>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
