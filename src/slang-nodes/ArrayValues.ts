import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ArrayValues implements SlangNode {
  readonly kind = NonterminalKind.ArrayValues;

  comments;

  loc;

  items: Expression[];

  separators: string[];

  constructor(ast: ast.ArrayValues, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new Expression(item, options));
    this.separators = ast.separators.map((separator) => separator.unparse());

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ArrayValues>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
