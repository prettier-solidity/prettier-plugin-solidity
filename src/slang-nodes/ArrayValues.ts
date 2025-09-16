import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ArrayValues extends SlangNode {
  readonly kind = NonterminalKind.ArrayValues;

  items: Expression['variant'][];

  constructor(ast: ast.ArrayValues, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new Expression(item, options))
    );
  }

  print(path: AstPath<ArrayValues>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
