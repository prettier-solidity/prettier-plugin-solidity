import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ArrayValues extends SlangNode {
  readonly kind = NonterminalKind.ArrayValues;

  items: Expression[];

  constructor(ast: ast.ArrayValues, options: ParserOptions<AstNode>) {
    super(ast);

    this.items = ast.items.map((item) => new Expression(item, options));

    this.updateMetadata(this.items);
  }

  print(path: AstPath<ArrayValues>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
