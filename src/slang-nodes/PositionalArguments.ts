import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printComments } from '../slang-printers/print-comments.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class PositionalArguments implements SlangNode {
  readonly kind = NonterminalKind.PositionalArguments;

  comments;

  loc;

  items: Expression[];

  separators: string[];

  constructor(ast: ast.PositionalArguments, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new Expression(item, options));
    this.separators = ast.separators.map((separator) => separator.unparse());

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<PositionalArguments>, print: PrintFunction): Doc {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'));
    }
    const argumentComments = printComments(path);

    return argumentComments.length > 0
      ? printSeparatedItem(argumentComments)
      : '';
  }
}
